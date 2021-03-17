import React, { Component } from 'react';
import './Table.scoped.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Buttons/Button/Button';

export default class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      fields,
      items,
      redirectToView,
      colLimit,
      handleDelete,
    } = this.props;

    return (
      <table>
        <thead id="table__bottom">
          <tr className="table__bottomRow">
            {fields.slice(0, colLimit).map((col) => (
              <th style={{ width: col.width }} key={col.key}>
                {col.name}
              </th>
            ))}
            <th style={{ width: '50px' }} />
          </tr>
        </thead>
        <tbody>
          {items.map((row, i) => (
            <tr key={row.id}>
              {fields.slice(0, colLimit).map((col) => {
                if (col.key === '#') {
                  return (
                    <td style={{ width: col.width }} key={col.key}>
                      {i + 1}
                    </td>
                  );
                }

                return (
                  <td style={{ width: col.width }} key={col.key}>
                    {row[col.key]}
                  </td>
                );
              })}
              <td style={{ width: '50px' }}>
                <div className="flex--horizontal">
                  <Button
                    isTransparent={false}
                    message="View"
                    type="right"
                    onClick={() => redirectToView(row.id)}
                  >
                    <FontAwesomeIcon icon="border-all" />
                  </Button>
                  <Button
                    id={row.id}
                    isTransparent={false}
                    message="Delete"
                    type="right"
                    onClick={() => handleDelete(row.id)}
                  >
                    <FontAwesomeIcon data-id={row.id} icon="times" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
