import React from "react"
import {Icon} from "antd"

export const Popup = ({record, visible, x, y}) => visible &&
  <ul className="popup" style={{left: `${x}px`, top: `${y}px`}}>
    <li><Icon type="user"/>{record.age}</li>
    <li><Icon type="heart-o"/>Like it</li>
    <li><Icon type="star-o"/>Bookmark</li>
  </ul>

