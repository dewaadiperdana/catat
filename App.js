import React, { Component } from 'react';
import { View } from 'react-native';
import { NativeRouter, Route, withRouter } from 'react-router-native';

/**
 * Routes
 */
import PrivateRoute from './src/components/Routes/PrivateRoute';

/**
 * Authentication Components
 */
import Login from './src/components/Auth/Login';
import Register from './src/components/Auth/Register';

/**
 * Dashboard Components
 */
import { Dashboard } from './src/components/Dashboard';

/**
 * Minggu Components
 */
import {
  DetailMinggu,
  TambahMinggu,
  EditMinggu
} from './src/components/Minggu';

/**
 * Hari Components
 */
import {
  TambahHari,
  DetailHari,
  EditHari
} from './src/components/Hari';

/**
 * Detail Item components
 */
import {
  TambahDetailItem,
  Detail,
  EditDetailItem
} from './src/components/DetailItem';

export default class App extends Component {
  render() {
    return (
      <NativeRouter>
        <View>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/minggu/tambah" component={TambahMinggu} />
          <PrivateRoute exact path="/minggu/edit/:id" component={EditMinggu} />
          <PrivateRoute exact path="/minggu/detail/:id" component={DetailMinggu} />
          <PrivateRoute exact path="/hari/tambah/:id_minggu" component={TambahHari} />
          <PrivateRoute exact path="/hari/edit/:id_minggu/:id_hari" component={EditHari} />
          <PrivateRoute exact path="/hari/detail/:id_minggu/:id_hari" component={DetailHari} />
          <PrivateRoute exact path="/detail-item/tambah/:id_minggu/:id_hari" component={TambahDetailItem} />
          <PrivateRoute exact path="/detail-item/detail/:id_minggu/:id_hari/:id" component={Detail} />
          <PrivateRoute exact path="/detail-item/edit/:id_minggu/:id_hari/:id" component={EditDetailItem} />
        </View>
      </NativeRouter>
    );
  }
}

