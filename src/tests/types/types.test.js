import '@testing-library/jest-dom';
import { types } from "../../types/types";

describe( 'Pruebas en types.js', () => {


    test( 'debe de retornar el objeto completo', () => {

        const typesTest = {
            login: '[Auth] Login',
            logout: '[Auth] Logout',

            /* UI types */
            uiSetError: '[UI] Set Error',
            uiRemoveError: '[UI] Remove Error',

            /* Loading Types */
            uiStartLoading: '[UI] Start loading',
            uiFinishLoading: '[UI] Finish loading',

            notesAddNew: '[Notes] New note',
            notesActive: '[Notes] Set active note',
            notesLoad: '[Notes] Load notes',
            notesUpdated: '[Notes] Update note saved',
            notesFileUrl: '[Notes] Updated image url',
            notesDelete: '[Notes] Delete note',
            notesLogoutCleaning: '[Notes] Logout cleaning',

        }


        expect( types ).toEqual( typesTest );

    } )


} )

