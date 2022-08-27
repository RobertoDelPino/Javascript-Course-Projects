export function Validar(obj)
{
    return (Object.values(obj).every(input => input !== ""));
}

