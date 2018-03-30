// @flow
import React from 'react'; //eslint-disable-line
import { describe, it, afterEach, beforeEach } from 'mocha';
import { mount, ReactWrapper } from 'enzyme';
import ModalContainer from '../src/modal_container';
import Modal from '../src/modal';
import chai from 'chai';

let expect = chai.expect;

describe('rendering modals', () => {

  function TestModalCloseButton(props) {
      return <button className="test-close-button" {...props}></button>;
  }

  function Wrapper({showModal}: {showModal?: boolean}) {
    return (
      <div>
        { showModal && <Modal className='test-modal' closeButtonComponent={TestModalCloseButton}>
          What
        </Modal> }
        <ModalContainer backdropClassName='test-backdrop-class-name' />
      </div>
    );
  }

  let wrapper: ReactWrapper;

  beforeEach(() => { wrapper = mount(<Wrapper />); });
  afterEach(() => { wrapper.unmount(); });

  describe('with a modal', () => {
    beforeEach(() => {
      wrapper.setProps({showModal: true});
    });

    it('renders modal content', () => {
      const modal = wrapper.find('.test-modal');

      expect(modal.length).to.eq(1);
      expect(modal.get(0).innerHTML).to.contain('What');
    });

    it('renders regular modal close button alongside content', () => {
        const modal = wrapper.find('.test-modal');
        const closeButton = modal.find('.test-close-button');

        expect(closeButton.length).to.eq(1);
    });
  });
});
