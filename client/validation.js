export default (data)=>{
    const errors = {};

    if (!data.name) {
        errors.e1 = 'El nombre no puede estar vacío';
    }
    if (data.name.length > 35) {
        errors.e2 = 'No puede tener más de 35 caracteres';
    }
    if (/\d/.test(data.name)) {
        errors.e3 = 'El nombre no debe contener números'
    }
    if (!data.height){
        errors.e4 ='La altura no puede estar vacío';
    }
    if (!data.weight){
        errors.e5 ='El peso no puede estar vacío';
    }
    if (!data.life_span){
        errors.e6 ='La esperanza de vida no puede estar vacío';
    }

    return errors;
};