import React from "react";

export const ExpandedSection = data => (
  <div className="eco--lot-show-expand">
    {data.modal.map(section => (
      <div className="section" key={section.title}>
        <table>
          <thead>
            <tr>
              <td colSpan={2}>{section.title}</td>
            </tr>
          </thead>
          <tbody>
            {section.items.map(i => {
              return (
                <tr key={i.key}>
                  <td>{i.name}</td>
                  <td>{data.data[i.key]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    ))}
  </div>
);
