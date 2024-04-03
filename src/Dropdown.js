import React, { useEffect, useState, useRef, useCallback } from 'react';
import _ from 'underscore';

/**
 * Dropdown component
 */
const Dropdown = ({
  name,
  /** Text placeholder when no value is selected */
  placeHolder,
  /** Current value */
  value,
  /** Array of options */
  options,
  /** onChange handler, fired when an item is selected or when text is entered */
  onChange,
  /** onSelect handler, fired when an item is selected */
  onSelect,
  /** onSearchInputChange handler, fired when text search is input */
  onSearchInputChange,
  /** override the render menu */
  onRenderMenu,
  /** override the render menu item */
  onRenderItem,
  /** override the render empty items */
  onRenderEmpty,
  /** override the render input field */
  onRenderInput,
  /** Label to display when no items are available */
  emptyLabel = "No items.",
  /** true to stripe menu items */
  striped,
  /** true to allow clearing of selection */
  clearable,
  /** true to allow text input searching */
  searchable,
  /** true to allow free form text entry that doesn't match an option */
  allowFreeFormText,
  /** true to disable the control */
  disabled,
  /** add classes to the rcsd-dropdown */
  className = '',
  /** add classes to the rcsd-input */
  inputContainerClassName = '',
  /** add classes to the input element */
  inputClassName = '',
  /** add classes to the menu */
  menuClassName = '',
  /** add classes to the items container */
  itemsClassName = '',
  /** add classes to the item */
  itemClassName = '',
  /** supply a custom formatter for formatting the value displayed */
  formatter,
  tabIndex,
  title,
  onFocus,
  onBlur,
  width,
  ...rest
}) => {
  
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [internalOptions, setInternalOptions] = useState(options || []);
  const [internalOptionsFiltered, setInternalOptionsFiltered] = useState(options || []);
  const [isFiltered, setIsFiltered] = useState(false);
  const [internalValue, setInternalValue] = useState(value);
  const [internalSelectedItem, setInternalSelectedItem] = useState(null);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  const globalClickHandler = useCallback((e) => {
    if (disabled) return;

    if (isFiltered) {
      if (!allowFreeFormText) {
        // reset filtering
        setIsFiltered(false);
        setInternalOptionsFiltered(internalOptions);
        const newInternalValue = formatter ? formatter(internalSelectedItem) : internalSelectedItem?.value || '';
        setInternalValue(newInternalValue);
        if (onChange) onChange(e, newInternalValue);
        if (onSelect) onSelect(e, newInternalValue);
      } else {
        // fire event handler for freeform text
        setInternalSelectedItem(e, internalValue);
      }
    }
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setMenuIsOpen(false);
    }
  }, [isFiltered, allowFreeFormText, internalValue, disabled, formatter]);

  useEffect(() => {
    window.addEventListener("click", globalClickHandler);
    return () => {
      window.removeEventListener("click", globalClickHandler);
    };
  }, [isFiltered, allowFreeFormText, internalValue]);

  useEffect(() => {
    setInternalOptions(options);
    setInternalOptionsFiltered(options);
  }, [options]);

  useEffect(() => {
    setInternalOptionsFiltered(internalOptions);
    setIsFiltered(false);
    const selectedItem = _.find(options, i => i.value === value);
    setInternalSelectedItem(selectedItem);
    if (selectedItem)
      setInternalValue((formatter ? formatter(selectedItem) : value) || '');
    else
      setInternalValue(value || '');
  }, [value, internalOptions]);

  const handleInputClick = (e) => {
    if (disabled) return;

    setMenuIsOpen(true);
  };

  const handleKeyUp = (e) => {
    switch(e.keyCode) {
      case 13:
        setInternalOptionsFiltered(internalOptions);
        setMenuIsOpen(false);
        setIsFiltered(false);

        if (internalSelectedItem) {
          setInternalValue(formatter ? formatter(internalSelectedItem) : internalSelectedItem.value);
          if (onChange) onChange(e, internalSelectedItem);
          if (onSelect) onSelect(e, internalSelectedItem);
        }
        break;
    }
  };

  const handleTextInputChange = (e) => {
    if (searchable) {
      setInternalValue(e.target.value);
      setMenuIsOpen(true);
      // filter options
      if (e.target.value.length > 0) {
        setInternalOptionsFiltered(_.filter(internalOptions, i => i.name.toLowerCase().startsWith(e.target.value.toLowerCase())));
        setIsFiltered(true);
      }
      else {
        setInternalOptionsFiltered(internalOptions);
        setIsFiltered(false);

        if (onChange) onChange(e, '');
        if (onSelect) onSelect(e, '');
      }
      if (onSearchInputChange) onSearchInputChange(e);
    }
    if (allowFreeFormText) {
      setInternalValue(e.target.value);
      if (onChange) onChange(e, e.target.value);
    }
  };

  const handleItemSelect = (e, option) => {
    setInternalSelectedItem(option);
    setInternalValue(formatter ? formatter(option) : option.value);
    setInternalOptionsFiltered(internalOptions);
    setIsFiltered(false);

    if (onChange) onChange(e, option);
    if (onSelect) onSelect(e, option);
  };

  const handleClear = (e) => {
    if (disabled) return;
    setInternalSelectedItem(null);
    setInternalValue('');
    setInternalOptionsFiltered(internalOptions);
    setIsFiltered(false);

    if (onChange) onChange(e, null);
    if (onSelect) onSelect(e, null);
  };

  const handleFocus = (e) => {
    setMenuIsOpen(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    // if we close the menu immediately, we won't receive a select event
    setTimeout(() => {
      setMenuIsOpen(false);
    }, 100);
    if (onBlur) onBlur(e);
  };

  const renderMenuInternal = () => {
    if (onRenderMenu) return onRenderMenu(renderItemInternal, internalSelectedItem, isFiltered, striped, handleItemSelect);
    return (<div className={`menu ${menuClassName}`}><div className={`items${striped ? ' striped' : ''} ${itemsClassName}`}>{renderItemInternal()}</div></div>);
  };

  const renderItemInternal = () => {
    if (internalOptionsFiltered && internalOptionsFiltered.length > 0) {
      return internalOptionsFiltered.map((option, key) => (onRenderItem && onRenderItem(key, option, internalSelectedItem, isFiltered, handleItemSelect)
        || (<div
          className={`item${option === internalSelectedItem ? ' selected' : ''} ${itemClassName}`}
          role="option"
          aria-checked={internalSelectedItem}
          aria-selected={internalSelectedItem}
          key={key}
          onClick={e => handleItemSelect(e, option)}>{option.text || option.name}</div>)
      ));
    }
    return <div className="item" role="option">{onRenderEmpty && onRenderEmpty() || emptyLabel}</div>;
  };

  const renderInputInternal = () => {
    if (onRenderInput) return onRenderInput(internalSelectedItem, searchRef, internalValue, placeHolder, handleTextInputChange, handleFocus, handleBlur);
    return <input
      className={`dropdown ${inputClassName}`}
      aria-autocomplete="list"
      autoComplete="new-password"
      onChange={handleTextInputChange}
      value={internalValue || ''}
      ref={searchRef}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyUp={handleKeyUp}
      {...(placeHolder ? { placeholder: placeHolder } : {})}
      {...(disabled ? { disabled } : {})}
      {...(tabIndex && tabIndex > 0 ? {tabIndex} : {})}
      {...(title && title?.length > 0 ? { title } : {})}
    />;
  };

  return (
    <div className={`rcsd rcsd-dropdown${disabled ? ' disabled' : ''} ${className}`} {...(width ? { style: { width: `${width}px` } } : {})} {...rest}>
      <div className={`rcsd-input ${inputContainerClassName}`} ref={inputRef} onClick={handleInputClick}>
        {renderInputInternal()}
        {clearable && (internalSelectedItem || (allowFreeFormText && value?.length > 0)) && <i aria-hidden="true" className="clear" onClick={handleClear} />}
        <i aria-hidden="true" className="icon" />
      </div>
      {menuIsOpen && renderMenuInternal()}
    </div>
  );
};

export default Dropdown;