import 'core-js'
import { fileUpload } from "../../helpers/fileUpload";
import cloudinary from "cloudinary";

cloudinary.config( {
    cloud_name: 'dpk4wwvg7',
    api_key: '549354491519339',
    api_secret: 'ey2bGEeCAMvPzmRyMjoSW3qLPns',
    secure: true
} );

describe( 'Pruebas en fileUpload', () => {


    test( 'Debe de retornar un archivo y retornar el url', async () => {

        const resp = await fetch( 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png' );
        const blob = await resp.blob();

        const file = new File( [ blob ], 'foto.png' );
        const url = await fileUpload( file )

        expect( typeof url ).toBe( 'string' )

        // Borrar imante por id
        const segments = url.split( '/' );
        const imageId = segments[ segments.length - 1 ].replace( '.png', '' );

        /* Funcion de cloudinary para borrar iagenes y no se nos llene  */
        cloudinary.v2.api.delete_resources( imageId, {}, () => {

        } );

    } )


    test( 'Debe de retornar un error', async () => {

        const file = new File( [], 'foto.png' );
        const url = await fileUpload( file )

        expect( url ).toBe( null )

    } )



} )

