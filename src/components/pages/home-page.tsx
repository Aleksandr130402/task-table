import Button from "@material-ui/core/Button";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import React, {ChangeEvent} from "react";
import { createUseStyles } from "react-jss";
import { useHistory } from "react-router-dom";
import { BrandFilter, PriceFilter } from "../filters";
import { IPhones } from "../interfeces";
import PhoneList from "../phone-list";
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

type HomePageProps = {
    addItem : (id: number) => void
    phones : IPhones[]
    firstValue : string
    secondValue : string
    priceFrom : number
    priceTo : number
    onChangeFirst : (e: ChangeEvent<HTMLInputElement>) => void
    onChangeSecond : (e: ChangeEvent<HTMLInputElement>) => void
    sortPrice : () => void
    handleChangeCheckbox : (e: ChangeEvent<HTMLInputElement>) => void
    priceFilter : boolean
    brandFilter : boolean
    filteredPhones : IPhones[] 
}

type Anchor = 'left';

const theme = createTheme({
    palette: {
        primary: {
            main: "#23be20"
        }
    },
});
 
const HomePage: React.FC<HomePageProps> = (props) => { 

    const [state, setState] = React.useState({
        left: false
    });
    
    const toggleDrawer = (anchor: Anchor, open: boolean) => (
        event: React.MouseEvent
    ) => {
        setState({ ...state, [anchor]: open });
    };

    const styles = makeStyles({
        mobileFiltersButton: {
            width: "100%",
            maxWidth: "200px",
            display: "none",
            WebkitBoxSizing: "border-box",
            boxSizing: "border-box",
            fontWeight: 700,
            fontSize: "14px",
            lineHeight: "16px",
            textAlign: "center",
            color: "#000",
            textTransform: "none"
        },
        "@media (max-width: 768px)": {
            mobileFiltersButton: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "40px"
            }
        }
    })
    const useStyles = createUseStyles({
        title: `
            margin-bottom: 2rem;
        `,
        category: {
            display: "flex"
        },
        container: {
            padding: "0 16px"
        },
        filtersHeader: {
            marginTop: "0px",
            display: "flex",
            alignItems: "center",
            marginBottom: "0px",
            minHeight: "50px",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            borderBottom: "1px solid #E0E0E0",
            borderTop: "1px solid #E0E0E0",
            "& i": {
                fontSize: "12px",
                marginRight: "15px"
            },
            "& h3": {
                fontSize: "16px"
            }
        },
        categoryFilters: `
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            max-width: 319px;
            min-width: 240px;
            width: 100%;
            margin-right: 20px;
        `,
        homePageHeader: {
            "@media (max-width: 768px)": {
                marginBottom: "16px"
            }       
        },
        closeBar: {
            color: "#e0e0e0",
            display: "block",
            textAlign: "end",
            padding: "10px",
            '&:hover': {
                color: '#4f4f4f',
                cursor: 'pointer'
            }
        },
        "@media (max-width: 950px)": {
            categoryFilters: {
                maxWidth: "250px !important"
            }
        },
        "@media (max-width: 768px)": {
            title: `
                display: flex;
                align-items: flex-end;
                font-size: 24px;
                line-height: 30px;
                margin: 0 8px 8px 0;
            `,
            categoryFilters: `
                display: none;
            `
        }
    })
    // jsx styles
    const classes = useStyles();
    // material-ui styles
    const clazz = styles();
    const history = useHistory();

    const {addItem, 
        phones, 
        firstValue, 
        secondValue, 
        priceFrom, 
        priceTo, 
        onChangeFirst, 
        onChangeSecond, 
        sortPrice,
        handleChangeCheckbox,
        priceFilter,
        brandFilter,
        filteredPhones} = props;

    let renderPhones;
    // отобразить отфильтрованные элементы
    if(priceFilter || brandFilter) {
        renderPhones = filteredPhones;
    } else {
        renderPhones = phones;
    }

    // список элементов боковой панели
    const list = (anchor: Anchor) => {
        return (
            <div role="presentation">
                <i className={`fas fa-times ${classes.closeBar}`} onClick={toggleDrawer(anchor, false)}/>
                <div className={classes.container}>
                    <div className={classes.filtersHeader}>
                        <h3>Фільтри</h3>
                    </div>
                    <div>          
                        <PriceFilter 
                            firstValue={firstValue} 
                            secondValue={secondValue} 
                            priceFrom={priceFrom}
                            priceTo={priceTo}
                            onChangeFirst={(e) => onChangeFirst(e)}
                            onChangeSecond={(e) => onChangeSecond(e)}
                            sortPrice={sortPrice}
                        />
                        <BrandFilter 
                            phones={phones}
                            handleChangeCheckbox={(e) => handleChangeCheckbox(e)}
                        />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <header className={classes.homePageHeader}>
                <div className={`${classes.container} ${classes.title}`}>
                    <h1>Смартфони і телефони</h1>
                </div> 
                <div className={classes.container}>
                        <ThemeProvider theme={theme}>
                            <Button  onClick={toggleDrawer('left', true)} variant="outlined" color="primary" className={clazz.mobileFiltersButton}>Фільтри</Button>
                        </ThemeProvider>
                </div>   
            </header>
            <div className={`${classes.category} ${classes.container}`}>
                <div className={classes.categoryFilters}>
                    <div className={classes.filtersHeader}>
                        <i className="fas fa-filter"/>
                        <h3>Фільтри</h3>
                    </div>
                    <div>          
                        <PriceFilter 
                            firstValue={firstValue} 
                            secondValue={secondValue} 
                            priceFrom={priceFrom}
                            priceTo={priceTo}
                            onChangeFirst={(e) => onChangeFirst(e)}
                            onChangeSecond={(e) => onChangeSecond(e)}
                            sortPrice={sortPrice}
                        />
                        <BrandFilter 
                            phones={phones}
                            handleChangeCheckbox={(e) => handleChangeCheckbox(e)}
                        />
                    </div>
                </div>
                <PhoneList 
                addItem={(id: number) => addItem(id)} 
                phones={renderPhones}
                onItemSelected={(id: number) => {
                    history.push(`/phone/${id}`) 
                }}
                />      
            </div>
            {(['left'] as Anchor[]).map((anchor) => (
            <React.Fragment key={anchor}>
                <SwipeableDrawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                    >
                    {list(anchor)}
                </SwipeableDrawer>  
            </React.Fragment>
            ))}     
        </>                  
    )
}

export default HomePage;