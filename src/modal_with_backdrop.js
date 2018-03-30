// @flow
import React from 'react';

import type {
  ModalDisplayInfo,
} from './types';

type Props = ModalDisplayInfo & {
  context: { setId: any }
}

export default class ModalWithBackdrop extends React.Component<*> {
  props: Props

  getChildContext() {
    return this.props.context;
  }

  static childContextTypes = {
    setId: () => {}
  }

  render() {
    const {
      children,
      component,
      closeButtonComponent,
      props,
      onBackdropClick,
      onCloseButtonClick,
      backdropClassName,
      modalClassName
    } = this.props;
    const Component = component;
    const CloseButtonComponent = closeButtonComponent;

    return (
      <div>
        <div className={backdropClassName || ''} onClick={onBackdropClick} />
        <div className={modalClassName || ''}>
          {CloseButtonComponent && <CloseButtonComponent onClick={onCloseButtonClick || (closeButtonComponent.props ? closeButtonComponent.props.onClick : null)} />}
          {!Component && children}
          {Component && <Component {...props} context={this.props.context} />}
        </div>
      </div>
    );
  }
}
