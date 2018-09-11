
describe('auth', () => {
    
    it('logoutWithFireBase debería ser una funcion', () => {
        assert.isFunction(logoutWithFireBase);
    });

    it('facebookLoginwithFireBase debería ser una funcion', () => {
        assert.isFunction(facebookLoginwithFireBase);
    });

    it('loginWithFirebase debería ser una funcion', () => {
        assert.isFunction(loginWithFirebase);
    });
    it('googleLoginwithFireBase debería ser una funcion', () => {
        assert.isFunction(googleLoginwithFireBase);
    });
});

describe('publicar', () => {
    it('mostrarPublicaciones debería ser una funcion', () => {
        assert.isFunction(mostrarPublicaciones);
    });

    it('editPost', () => {
        assert.isFunction(editPost);
    });

    it('deletePost', () => {
        assert.isFunction(deletePost);
    });
})