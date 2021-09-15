import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { isLoginHandler, isLoginModalOpenHandler } from '../../Redux/actions/actions';
import Portal from './Portal';
// import './index.scss';
