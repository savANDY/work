/* global alert */

import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import i18n from 'meteor/universe:i18n';
import BaseComponent from './BaseComponent.jsx';
import { insert } from '../../api/lists/methods.js';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBriefcase} from "@fortawesome/free-solid-svg-icons";

export default class ListList extends BaseComponent {
  constructor(props) {
    super(props);
    this.createNewList = this.createNewList.bind(this);
  }

  createNewList() {
    const listId = insert.call({ locale: i18n.getLocale() }, (err) => {
      if (err) {
        this.redirectTo('/');
        /* eslint-disable no-alert */
        alert(i18n.__('components.listList.newListError'));
      }
    });
    this.redirectTo(`/lists/${listId}`);
  }

  render() {
    const { lists } = this.props;
    return this.renderRedirect() || (
        <ul className="navbar-nav">

          <li className="nav-item">
            <a className="nav-link collapsed" href="#" data-toggle="collapse"
               data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
              <FontAwesomeIcon icon={faBriefcase}/>
              <span>To-do</span>
            </a>
            <div id="collapsePages" className="collapse" aria-labelledby="headingPages"
                 data-parent="#accordionSidebar">
              <div className="bg-white py-2 collapse-inner rounded list-todos">
                <h6 className="collapse-header">Lists:</h6>
                {lists.map(list => (
                    <NavLink
                        to={`/lists/${list._id}`}
                        key={list._id}
                        title={list.name}
                        className="collapse-item"
                        activeClassName="active"
                      >
                        {list.userId
                          ? <span className="icon-lock" />
                          : null}
                        {list.incompleteCount
                          ? <span className="count-list">{list.incompleteCount}</span>
                          : null}
                        {list.name}
                      </NavLink>
                    ))}
                <div className="collapse-divider"/>
                <h6 className="collapse-header">New list:</h6>
                <a className="collapse-item" onClick={this.createNewList}>{i18n.__('components.listList.newList')}</a>
              </div>
            </div>
          </li>


        </ul>
    );
  }
}
      {/*<div className="list-todos">*/}
      {/*  <a className="link-list-new" onClick={this.createNewList}>*/}
      {/*    <span className="icon-plus" />*/}
      {/*    {i18n.__('components.listList.newList')}*/}
      {/*  </a>*/}
      {/*  {lists.map(list => (*/}
      {/*    <NavLink*/}
      {/*      to={`/lists/${list._id}`}*/}
      {/*      key={list._id}*/}
      {/*      title={list.name}*/}
      {/*      className="list-todo"*/}
      {/*      activeClassName="active"*/}
      {/*    >*/}
      {/*      {list.userId*/}
      {/*        ? <span className="icon-lock" />*/}
      {/*        : null}*/}
      {/*      {list.incompleteCount*/}
      {/*        ? <span className="count-list">{list.incompleteCount}</span>*/}
      {/*        : null}*/}
      {/*      {list.name}*/}
      {/*    </NavLink>*/}
      {/*  ))}*/}
      {/*</div>*/}

ListList.propTypes = {
  lists: PropTypes.array,
};
