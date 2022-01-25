export const fileUpload = async ( file ) => {
    const cloudUrl = 'https://api.cloudinary.com/v1_1/dpk4wwvg7/upload';
    const formData = new FormData();

    /* Use form data because is a file from input file */
    formData.append( 'upload_preset', 'react-journal' );
    formData.append( 'file', file );

    try {

        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        } )

        if ( resp.ok ) {
            const cloudResp = await resp.json();
            return cloudResp.secure_url
        } else {
            return null
        }

    } catch ( error ) {
        throw error
    }
}