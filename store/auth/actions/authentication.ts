import { Api } from '../../../api';
import { AuthSendForm } from '../../../types/auth';
import { ThunkAction } from '../../../types/known-actions';
import { GenericWrapperReturnType } from '../../../types/warning';
import { translate } from '../../../utils/i18n/translate';
// eslint-disable-next-line import/no-cycle
import { WarningActions } from '../../warning/actions';
import { AuthPlainActions } from './plain';

export const signIn =
  (data: AuthSendForm): ThunkAction<Promise<GenericWrapperReturnType<void>>> =>
  async (dispatch) =>
    dispatch(
      WarningActions.wrappers.loadingData(
        async () => {
          if (!data.login || !data.password) throw new Error('T_FIELDS_ARE_EMPTY');
          const authData = await Api.auth.signIn(data);
          if (authData.data) {
            dispatch(AuthPlainActions.setState(authData.data));
            dispatch(WarningActions.showSnackBar(translate('T_SUCCESS_LOGIN'), 'success'));
          }
          if (!authData.data) throw new Error('T_ERROR_LOGIN');
        },
        () => dispatch(WarningActions.showSnackBar(translate('errors:T_ERROR_LOGIN'), 'error')),
        { showWarning: false }
      )
    );

export const signOut = (): ThunkAction => (dispatch) => {
  dispatch(AuthPlainActions.clearState());
};
