import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { inputPlayList, deleteMusic } from '../../Redux/actions/actions';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import PlayList from '../../Components/PlayList';
import axios from 'axios';

function Sidebar () {
  return <h1>hello</h1>;
}

export default Sidebar;
