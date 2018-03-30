// @flow
import React from 'react';
import { mountModal, updateModal, unmountModal } from './modal_controller';
import type { ModalIdentifier } from './types';

type Props = {
  component?: any,
  children?: any,
  props?: Object,
  stackOrder?: number,
  className?: string,
  onBackdropClick?: Function,
  onCloseButtonClick?: Function,
  closeButtonComponent?: any,
}

type State = {
  modalId?: string
}

type Context = {
  setId: ModalIdentifier
}

/**
 * Renders its contents in a modal div with a backdrop.
 * Use Modal if you want to show a modal without changing the route.
 *
 * The content that is shown is specified by *either* the "component" prop, or by
 * child elements of the Modal.
 *
 * @param {Object} props
 * @param {Number} props.stackOrder order to stack modals, higher number means "on top"
 * @param {String} props.className class name to apply to modal container
 * @param {Children} props.children Modal content can be specified as chld elements
 * @param {Component} props.component React component to render in the modal
 * @param {Object} props.props props to pass to the react component specified by the component property
 * @param {Function} props.onBackdropClick handler to be invoked when the modal backdrop is clicked
 * @param {Function} props.onCloseButtonClick handler to be invoked when the modal close button is clicked
 * @param {Component} props.closeButtonComponent props.closeButtonComponent Any arbitrary component to act as a close button. Can have custom click event, but will be overridden by onCloseButtonClick if defined. Will be rendered inside modal container by default, but can be styled however way you want and even supports portals for maximum customization possibilities
 *
 * @example <caption>Modals using a component and props, vs. child elements</caption>
 *
 * const Hello = ({ who }) => (<div>Hello {who}!</div>);
 *
 * // component and props
 * const ComponentExample = () => (
 *   <Modal
 *    component={Hello}
 *    props={{ who: 'World' }}
 *   />
 * );
 *
 * // using child elements
 * const ChildrenExample = () => (
 *   <Modal>
 *     <Hello who='World' />
 *   </Modal>
 * );
 *
 * @example <caption>Specifying stack order</caption>
 * <div>
 *   <Modal
 *     className='top-component-modal'
 *     component={MyTopComponent}
 *     props={ { foo: 'bar'} }
 *     stackOrder={2}
 *   />
 *   <Modal
 *     component={MyBottomComponent}
 *     props={ { bar: 'baz'} }
 *     stackOrder={1}
 *   />
 * </div>
 *
 * @example <caption>Modal with close button</caption>
 * <div>
 *   <Modal
 *     component={MyTopComponent}
 *     closeButtonComponent={MyCloseButton}
 *   />
 * </div>
 */

export default class Modal extends React.Component<Props, State> {
  props: Props
  state: State = {}
  context: Context
  componentWillMount() {
    const { className, children, component, stackOrder, props, onBackdropClick, onCloseButtonClick, closeButtonComponent } = this.props;
    this.setState({
      modalId: mountModal({
        setId: this.context.setId || 0,
        component,
        children,
        closeButtonComponent,
        props: props || {},
        stackOrder,
        onBackdropClick,
        onCloseButtonClick,
        className
      })
    });
  }

  static contextTypes = {
    setId: () => {}
  }

  componentWillReceiveProps(next: Props) {
    const { className, children, component, stackOrder, props, onBackdropClick, onCloseButtonClick, closeButtonComponent } = next;
    updateModal(this.state.modalId, {
      component,
      children,
      closeButtonComponent,
      props: props || {},
      stackOrder,
      onBackdropClick,
      onCloseButtonClick,
      className,
    });
  }

  componentWillUnmount() {
    unmountModal(this.state.modalId);
  }

  render() {
    return null;
  }
}