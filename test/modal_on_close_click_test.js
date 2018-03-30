// @flow
import React from 'react';
import { describe, it, afterEach, beforeEach } from 'mocha';
import { mount, ReactWrapper } from 'enzyme';
import ModalContainer from '../src/modal_container';
import Modal from '../src/modal';
import chai from 'chai';

let expect = chai.expect;

function TestModalContent() {
  return <div></div>;
}

function TestCloseButton(props) {
  return <button className="test-close-button" {...props}></button>;
}

describe('handling click on close button', () => {
  let wrapper: ReactWrapper;
  let clicked: boolean;

  function onCloseButtonClick() {
    clicked = true;
  }

  beforeEach(() => {
    clicked = false;

    wrapper = mount(
      <div>
        <Modal className="test-modal test-modal-foo" component={TestModalContent} props={{}} onCloseButtonClick={onCloseButtonClick} closeButtonComponent={TestCloseButton} />
        <ModalContainer backdropClassName="test-backdrop" />
      </div>
    );
  });

  afterEach(() => { wrapper.unmount(); });

  it('invokes handler when clicked', () => {
    expect(clicked).to.eq(false);
    const closeButton = wrapper.find('.test-close-button');

	closeButton.simulate('click');
    expect(clicked).to.eq(true);
  });
});
