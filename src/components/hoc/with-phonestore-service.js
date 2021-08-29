import React from "react";
import { PhonestoreServiceConsumer } from "../context/phonestore-service-context";

// получить все телефоны через контекст
const withPhonestoreService = () => (Wrapped) => {
    return (props) => {
        return (
            <PhonestoreServiceConsumer>
                {
                    (phonestoreService) => {
                        return (<Wrapped {...props}
                        phonestoreService={phonestoreService}/>);
                    }
                }
            </PhonestoreServiceConsumer>
        )
    }
}

export default withPhonestoreService;