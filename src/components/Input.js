import Form from 'react-bootstrap/Form';

const Input = ({name, label, value, onChangeFunc}) => {

    return (
        
        <Form.Group controlId={`input-${name}`}>
            <Form.Label>{label}</Form.Label>
            <Form.Control type="number" placeholder={name}  value={value} 
                    onChange={onChangeFunc} />
        </Form.Group>
        
    )
}

export default Input
