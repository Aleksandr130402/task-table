import React, {useState} from "react";
import { Button, createTheme, ThemeProvider } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import withPhonestoreService from "./hoc/with-phonestore-service";
import { createUseStyles } from "react-jss";
import PhonestoreService from "../services/phonestore-service";
import { useEffect } from "react";
import { IPhones } from "./interfeces";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

type PhoneDetailsProps = {
    itemId : number
    phonestoreService : PhonestoreService
    addItem : (id: number) => void
}

const styles = makeStyles((theme: Theme) =>
    createStyles({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        "@media (max-width: 767px)": {
            width: "100%"
        }
    },
    accordionPanel: {
        display: "none",
        WebkitBoxShadow: "0 0 7px #e0e0e0",
        boxShadow: "0 0 7px #e0e0e0",
        marginBottom: "48px",
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    "@media (max-width: 767px)": {
        root: {
            width: "100%"
        },
        accordionPanel: {
            display: "block"
        },
    }
    }),
);

const PhoneDetails: React.FC<PhoneDetailsProps> = ({ itemId, phonestoreService, addItem }) => {
    // детали про выбранный телефон
    const [renderItem, addRenderItem] = useState<IPhones>({
        id: 0,
        actual: false,
        title : '',
        price: 0,
        coverImage: '',
        brand: ''
    });
    // сделать кнопку с цветом активной
    const [activeButton, addActive] = useState(0);
    // значение выбранной Tab
    const [value, setValue] = useState(0);

    // получить все телефоны
    const phones = phonestoreService.getPhones();
    // доступные цвета телефонов
    const phoneColors = ["#ff0", "#00f", "#000"];

    useEffect(() => {
        const newItem = phones.find((phone) => phone.id == itemId);
        if(newItem) {
            addRenderItem(newItem);
        }    
    },[itemId]);

    const theme = createTheme({
        palette: {
            primary: green,
        },
    });  

    const useStyles = createUseStyles({
        coverImage: `
            max-width: 100%;
            width: 506px !important;
            height: 506px !important;
            -o-object-fit: contain;
            object-fit: contain;
        `,
        productName: `
            font-weight: 500;
            font-size: 24px;
            line-height: 30px;
            color: #1A1919;
            margin-bottom: 16px;
        `,
        phonePrice: {
            fontSize: "30px",
            lineHeight: 1,
            fontWeight: 500,
            marginBottom: "16px"
        },
        addToCartIcon: {
            marginRight: "10px"
        },
        mediaGallery: `
            text-align: center;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: flex-start;
        `,
        phoneTopInfo: {
            display: "flex",
            paddingBottom: "32px"
        },
        container: {
            padding: "0 16px"
        },
        phoneInfoContainer: `
            display: flex;
            flex-direction: column;
            width: 100%;
            border: 1px solid #dcdcdc;
            border-radius: 5px;
        `,
        productWrapper: `
            padding: 16px;
        `,
        inputColorWrapper: `
            margin: 0 6px 6px 0;
            position: relative;
            display: inline-flex;

        `,
        radioButton: {
            borderRadius: "50%",
            border: "1px solid",
            backgroundColor: "rgba(0,0,0,0)",
            width: "38px",
            height: "38px",
            borderColor: "transparent",
            "&:hover": `
                border-color: #bdbdbd;
            `
        },
        active: `
            border-color: #23be20;
        `,
        colorInside: `
            width: 32px;
            height: 32px;
            left: 50%;
            top: 50%;
            border: 1px solid #fff;
            -webkit-transform: translate(-50%,-50%);
            transform: translate(-50%,-50%);
            background-position: center;
            background-size: cover;
            border-radius: 50%;
            position: absolute;
        `,
        tabPanel: {
            maxWidth: "600px",
        },
        appBar: {
            width: "100%",
            "& p": `
                font-size: 15px;
                line-height: 24px;
            `
        },
        "@media (min-width: 768px) and (max-width: 1024px)": {
            phoneInfoContainer: {
                maxWidth: "320px"
            }
        },
        "@media (max-width: 767px)": {
            phoneTopInfo: `
                flex-direction: column;
                grid-gap: 24px;
            `,
            appBar: {
                display: "none"
            }
        }
    })
    // jsx styles
    const classes = useStyles();
    // material-ui styles
    const clazz = styles();

    // показать определенную панель
    function TabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box p={3}>
                <Typography>{children}</Typography>
              </Box>
            )}
          </div>
        );
    }
    // соответствие каждого Tab и панели
    function a11yProps(index: any) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    let button;
    // если есть в наличии отобразить кнопку
    if(renderItem.actual) {
        button = <ThemeProvider theme={theme}>
        <Button variant="contained" color="primary" onClick={() => addItem(renderItem.id)}>
            <i className={`fa fa-shopping-cart ${classes.addToCartIcon}`}/>
            Купити
        </Button>
        </ThemeProvider>  
    }  

    return(
        <>
        <div className={classes.container}>
            <section className={classes.phoneTopInfo}>
            <div className={classes.mediaGallery}>
                <img src={renderItem.coverImage} className={classes.coverImage}/>
            </div>       
            <div className={classes.phoneInfoContainer}>
                <div className={classes.productWrapper}>
                    <h2 className={classes.productName}>{renderItem.title}</h2>
                    <div>{renderItem.actual ? 'В наявності' : 'Немає'}</div>
                    <div>
                        {
                        phoneColors.map((color, idx) => {
                            return(
                                <div key={idx} className={classes.inputColorWrapper}>
                                    <button name={color} className={`${classes.radioButton}  ${activeButton === idx ? classes.active : ''}`} onClick={() => addActive(idx)}>
                                        <span className={classes.colorInside} style={{backgroundColor: color}}></span>
                                    </button>
                                </div>
                            ) 
                        })
                        }
                    </div>
                </div>
                <div className={classes.productWrapper}>
                    <div className={classes.phonePrice}>{renderItem.price} &#8372;</div>
                    {button}
                </div>
            </div>
            </section>
        </div>
        <div className={clazz.root}>
            <div className={classes.appBar}>
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Про товар" {...a11yProps(0)} />
                    <Tab label="Характеристики" {...a11yProps(1)} />
                    <Tab label="Відгуки" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <div className={classes.tabPanel}>
                    <TabPanel value={value} index={0}>
                        <h3>Про товар</h3>
                        <p><strong>Збережіть кожен яскравий момент</strong></p>
                        <p>Система з 3-х камер знімає неймовірно яскраві і чіткі фотографії, де б не проходила фотосесія. Основна камера 48 Мп захоплює в кадр більше деталей і отримує деталізовані знімки навіть після наближення. Макросенсор 2 Мп забезпечує отримання приголомшливих фотографій з невеликої відстані всього в кілька сантиметрів. Датчик глибини 2 Мп допомагає отримати атмосферні портрети з розмитим фоном.</p>
                        <p><strong>Непередавані враження від перегляду</strong></p>
                        <p>FHD+ 6.53" Dot Drop дисплей з кінематографічним співвідношенням сторін 19,5:9 забезпечує більше місця для ігор, відпочинку і спілкування. Зображення на великому екрані виглядає живим, яскравим і природним. Сертифікація TÜV Rheinland свідчить про те, що шкідливе для очей синє випромінювання знаходиться на безпечному рівні.</p>
                        <p><strong>Повне занурення в контент</strong></p>
                        <p>Завдяки флагманським подвійним динамікам якість звуку в Poco M3 вражає своєю реалістичністю, чіткістю і чистотою. Не важливо, чи слухаєте ви улюблену музику, чи навчальну лекцію, в будь-якому випадку вам забезпечений ефект повного занурення.</p>
                        <p><strong>Досить думати про заряд</strong></p>
                        <p>Батарея ємністю 6000 мАг забезпечує багато годин автономної роботи. Ви більше не будете думати про підзарядку, адже повного заряду вистачить на 196 годин відтворення музики, на 17 годин перегляду відео або на 40 годин безперервної розмови.</p>
                        <p><strong>Збільшений робочий ресурс</strong></p>
                        <p>Акумулятор розрахований не менше, ніж на 1000 циклів заряду, а це означає більше 2.5 років роботи без суттевого погіршення початкових характеристик. Час автономної роботи смартфона в середньому вище до 20% в порівнянні з аналогічними моделями. Poco M3 працює навіть тоді, коли інші готові здатися.</p>
                        <p><strong>Більше місця для зберігання</strong></p>
                        <p>Вбудована пам'ять до 128 Гб з підтримкою карт пам'яті до 512 Гб надає величезні можливості для зберігання інформації. Тепер ваші найкращі фото, музичні плейлисти і улюблені серіали знаходяться на відстані одного кліка.</p>
                        <p><strong>Створений для амбітних завдань</strong></p>
                        <p>Poco M3 створений для стабільної роботи в режимі багатозадачності. 11-нм процесор Qulacomm Snapdragon 662 легко справляється з трудомісткими завданнями і дозволяє дивитися відео у високій роздільній здатності, грати в будь-які ігри і спілкуватися без обмежень.</p>
                        <p><strong>Зручне розблокування</strong></p>
                        <p>Сканер відбитків спеціально інтегрований в бічну кнопку розблокування, щоб не змушувати вас чекати і забезпечити миттєвий доступ до Poco M3.</p>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        {`Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam eligendi dolor quo aut, harum veritatis laborum doloribus optio aperiam ea! 
                        Cum ipsum sequi quis temporibus necessitatibus excepturi ad. Sed, minima! Quos neque inventore delectus minus aperiam, voluptates voluptatem. 
                        Corrupti voluptate hic ab nam! Nam quibusdam quasi consectetur nisi adipisci expedita dolore nemo ex eligendi perferendis eum ab sequi placeat 
                        deserunt dignissimos voluptatibus quidem dolorem magnam, eos, molestias quo perspiciatis praesentium alias saepe. Nobis eligendi ex libero ma
                        gni minus rem esse, delectus quo! Cupiditate ipsa minus officia sed illum dicta iste, optio aspernatur culpa corrupti reprehenderit consectetur 
                        ipsum maxime exercitationem natus officiis pariatur aperiam facilis saepe tempora hic vitae iure in. Officiis similique sint nisi doloribus 
                        nulla voluptate quos, natus laborum nemo eveniet amet dolore aliquam magnam odio saepe dolorum sapiente quibusdam, vel blanditiis, voluptates 
                        dignissimos itaque porro voluptatibus qui! Rem reiciendis alias corporis inventore, dicta qui nulla totam iusto quos earum, voluptatibus 
                        tempore laboriosam beatae excepturi? Eveniet esse fugiat enim ratione sequi amet, dolore consectetur saepe quibusdam odio placeat sint alias, 
                        dolorem vero tempora porro. Repellat, ipsa voluptatum! Architecto quo minima, neque reiciendis consectetur dolore libero magnam eligendi iure 
                        facere placeat vitae itaque mollitia ullam commodi error ad veritatis alias nisi impedit eaque obcaecati voluptas, quasi esse? Quae adipisci 
                        reiciendis pariatur praesentium dolorem eligendi doloribus expedita id provident dicta magni hic nihil ipsa beatae, asperiores ut, illum quas. 
                        Voluptatibus corporis amet ex accusamus porro id officia similique quod, quidem harum, ratione atque eaque velit mollitia debitis itaque, 
                        recusandae sunt exercitationem magnam! Modi ullam impedit repudiandae veniam. Similique tenetur soluta, quae quis labore pariatur? Ipsa, quam 
                        laboriosam? Pariatur non laboriosam ullam minima ratione quis, a voluptatem voluptates, doloribus iste minus ipsum. Animi, veritatis illum, 
                        repellendus illo pariatur assumenda eligendi numquam, ducimus ad officiis tempore? Recusandae ipsam odit accusamus ex vitae. Laborum!`}
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        {`Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam eligendi dolor quo aut, harum veritatis laborum doloribus optio aperiam ea! 
                        Cum ipsum sequi quis temporibus necessitatibus excepturi ad. Sed, minima! Quos neque inventore delectus minus aperiam, voluptates voluptatem. 
                        Corrupti voluptate hic ab nam! Nam quibusdam quasi consectetur nisi adipisci expedita dolore nemo ex eligendi perferendis eum ab sequi placeat 
                        deserunt dignissimos voluptatibus quidem dolorem magnam, eos, molestias quo perspiciatis praesentium alias saepe. Nobis eligendi ex libero ma
                        gni minus rem esse, delectus quo! Cupiditate ipsa minus officia sed illum dicta iste, optio aspernatur culpa corrupti reprehenderit consectetur 
                        ipsum maxime exercitationem natus officiis pariatur aperiam facilis saepe tempora hic vitae iure in. Officiis similique sint nisi doloribus 
                        nulla voluptate quos, natus laborum nemo eveniet amet dolore aliquam magnam odio saepe dolorum sapiente quibusdam, vel blanditiis, voluptates 
                        dignissimos itaque porro voluptatibus qui! Rem reiciendis alias corporis inventore, dicta qui nulla totam iusto quos earum, voluptatibus 
                        tempore laboriosam beatae excepturi? Eveniet esse fugiat enim ratione sequi amet, dolore consectetur saepe quibusdam odio placeat sint alias, 
                        dolorem vero tempora porro. Repellat, ipsa voluptatum! Architecto quo minima, neque reiciendis consectetur dolore libero magnam eligendi iure 
                        facere placeat vitae itaque mollitia ullam commodi error ad veritatis alias nisi impedit eaque obcaecati voluptas, quasi esse? Quae adipisci 
                        reiciendis pariatur praesentium dolorem eligendi doloribus expedita id provident dicta magni hic nihil ipsa beatae, asperiores ut, illum quas. 
                        Voluptatibus corporis amet ex accusamus porro id officia similique quod, quidem harum, ratione atque eaque velit mollitia debitis itaque, 
                        recusandae sunt exercitationem magnam! Modi ullam impedit repudiandae veniam. Similique tenetur soluta, quae quis labore pariatur? Ipsa, quam 
                        laboriosam? Pariatur non laboriosam ullam minima ratione quis, a voluptatem voluptates, doloribus iste minus ipsum. Animi, veritatis illum, 
                        repellendus illo pariatur assumenda eligendi numquam, ducimus ad officiis tempore? Recusandae ipsam odit accusamus ex vitae. Laborum!`}
                    </TabPanel>
                </div>
            </div>
            <div className={clazz.accordionPanel}>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography className={clazz.heading}>Про товар</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        <h3>Про товар</h3>
                        <p><strong>Збережіть кожен яскравий момент</strong></p>
                        <p>Система з 3-х камер знімає неймовірно яскраві і чіткі фотографії, де б не проходила фотосесія. Основна камера 48 Мп захоплює в кадр більше деталей і отримує деталізовані знімки навіть після наближення. Макросенсор 2 Мп забезпечує отримання приголомшливих фотографій з невеликої відстані всього в кілька сантиметрів. Датчик глибини 2 Мп допомагає отримати атмосферні портрети з розмитим фоном.</p>
                        <p><strong>Непередавані враження від перегляду</strong></p>
                        <p>FHD+ 6.53" Dot Drop дисплей з кінематографічним співвідношенням сторін 19,5:9 забезпечує більше місця для ігор, відпочинку і спілкування. Зображення на великому екрані виглядає живим, яскравим і природним. Сертифікація TÜV Rheinland свідчить про те, що шкідливе для очей синє випромінювання знаходиться на безпечному рівні.</p>
                        <p><strong>Повне занурення в контент</strong></p>
                        <p>Завдяки флагманським подвійним динамікам якість звуку в Poco M3 вражає своєю реалістичністю, чіткістю і чистотою. Не важливо, чи слухаєте ви улюблену музику, чи навчальну лекцію, в будь-якому випадку вам забезпечений ефект повного занурення.</p>
                        <p><strong>Досить думати про заряд</strong></p>
                        <p>Батарея ємністю 6000 мАг забезпечує багато годин автономної роботи. Ви більше не будете думати про підзарядку, адже повного заряду вистачить на 196 годин відтворення музики, на 17 годин перегляду відео або на 40 годин безперервної розмови.</p>
                        <p><strong>Збільшений робочий ресурс</strong></p>
                        <p>Акумулятор розрахований не менше, ніж на 1000 циклів заряду, а це означає більше 2.5 років роботи без суттевого погіршення початкових характеристик. Час автономної роботи смартфона в середньому вище до 20% в порівнянні з аналогічними моделями. Poco M3 працює навіть тоді, коли інші готові здатися.</p>
                        <p><strong>Більше місця для зберігання</strong></p>
                        <p>Вбудована пам'ять до 128 Гб з підтримкою карт пам'яті до 512 Гб надає величезні можливості для зберігання інформації. Тепер ваші найкращі фото, музичні плейлисти і улюблені серіали знаходяться на відстані одного кліка.</p>
                        <p><strong>Створений для амбітних завдань</strong></p>
                        <p>Poco M3 створений для стабільної роботи в режимі багатозадачності. 11-нм процесор Qulacomm Snapdragon 662 легко справляється з трудомісткими завданнями і дозволяє дивитися відео у високій роздільній здатності, грати в будь-які ігри і спілкуватися без обмежень.</p>
                        <p><strong>Зручне розблокування</strong></p>
                        <p>Сканер відбитків спеціально інтегрований в бічну кнопку розблокування, щоб не змушувати вас чекати і забезпечити миттєвий доступ до Poco M3.</p>
                    </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    >
                    <Typography className={clazz.heading}>Характеристики</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
                    </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                    >
                    <Typography className={clazz.heading}>Відгуки</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
                    </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
        </>
    )
}

export default withPhonestoreService()(PhoneDetails);