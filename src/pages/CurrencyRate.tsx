import React, { useContext, useEffect } from 'react'
import { CurrencyApiContext } from '../contexts'
import { CurrencyApi } from '../services';
import { AppState } from '../store/models';

const CurrencyRate = () => {

  return (
    <div>
      CurrencyRate
    </div>
  )
}

const mapStateToProps = (state: AppState) => {

}

export default CurrencyRate
