import React, { useEffect, useState } from "react";
import styles from "./osobne-udaje.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import { personalInformationUserInputInitialValues } from "../lib/initialValues";
import { useRouter } from "next/router";
import { Input } from "../components/FormComponents";
import * as Yup from "yup";
import { PersonalInformationUserInput } from "../lib/types";
import { assignOnlyExistingKeys } from "../lib/utils";

const nextUrl = "/vysledky";
const backUrl = "/partner";

const OsobneUdaje = ({ taxForm, updateTaxForm }) => {
  const [autoformPersons, setAutoFormPersons] = useState([]);

  const router = useRouter();
  const handleSubmit = values => {
    updateTaxForm(values);
    router.push(nextUrl);
  };

  const getCity = zip => {
    return fetch(`https://api.posta.sk/private/search?q=${zip}&m=zip`)
      .then(response => response.json())
      .then(pscData => {
        return pscData &&
          pscData.offices &&
          pscData.offices[0] &&
          pscData.offices[0].name
          ? pscData.offices[0].name
          : "";
      });
  };

  const getAutoformByPersonName = (fullName: string) => {
    //TODO: Load data from Autoform API
    /*return fetch(
      `https://autoform.ekosystem.slovensko.digital/api/corporate_bodies/search?q=name:${fullName}&private_access_token=07b5d1d69b1a3325a38846f761ea31361e5e5b88d6b8b4bc576a1cacd470db1312d2bff562955ae3`,
    )
      .then(response => response.json())
      .then(json => json);*/

    return [
      {
        id: 1358414,
        cin: "50 158 635",
        tin: 2120264674,
        vatin: null,
        name: "Slovensko.Digital",
        datahub_corporate_body: {
          id: 1358414,
          url:
            "https://datahub.ekosystem.slovensko.digital/api/datahub/corporate_bodies/1358414",
        },
        formatted_address:
          "Staré Grunty 6207/12, 841 04 Bratislava - mestská časť Karlova Ves",
        street: "Staré Grunty",
        reg_number: 6207,
        building_number: "12",
        street_number: "6207/12",
        formatted_street: "Staré Grunty 6207/12",
        postal_code: "841 04",
        municipality: "Bratislava - mestská časť Karlova Ves",
        country: "Slovenská republika",
        established_on: "2016-01-29",
        terminated_on: null,
        vatin_paragraph: null,
        registration_office: "MV SR",
        registration_number: "VVS/1-900/90-48099",
      },
    ];
  };

  const handleAutoform = async (values, setFieldValue) => {
    if (values["r005_meno"].length > 0 && values["r004_priezvisko"].length) {
      const personsData = await getAutoformByPersonName(
        `${values["r005_meno"]} ${values["r004_priezvisko"]}`,
      );
      console.log(personsData);
      if (personsData) {
        setAutoFormPersons(personsData);
      }
    }
  };

  useEffect(() => {
    router.prefetch(nextUrl);
  });

  return (
    <>
      <Link href={backUrl}>
        <a className="govuk-back-link">Naspat</a>
      </Link>
      <Formik
        initialValues={assignOnlyExistingKeys(
          personalInformationUserInputInitialValues,
          taxForm,
        )}
        onSubmit={handleSubmit}
        getCity={getCity}
        // validationSchema={validationSchema}
      >
        {props => (
          <Form className="form">
            <h2>Údaje o daňovníkovi</h2>

            <Input
              name="r005_meno"
              type="text"
              label="Meno"
              onBlur={e => {
                props.handleBlur(e);
                handleAutoform(props.values, props.setFieldValue);
              }}
            />
            <Input
              name="r004_priezvisko"
              type="text"
              label="Priezvisko"
              onBlur={e => {
                props.handleBlur(e);
                handleAutoform(props.values, props.setFieldValue);
              }}
            />

            {autoformPersons.length > 0 && (
              <div>
                <h2>Udaje nemusite vypisovat, staci si vybrat osobu:</h2>
                <ol className="govuk-list govuk-list--number">
                  {autoformPersons.map(person => (
                    <li
                      className={styles.clickable}
                      onClick={() => {
                        props.setFieldValue("r001_dic", person.tin);
                        props.setFieldValue("r007_ulica", person.street);
                        props.setFieldValue("r008_cislo", person.street_number);
                        props.setFieldValue("r009_psc", person.postal_code);
                        props.setFieldValue("r010_obec", person.municipality);
                        props.setFieldValue("r011_stat", person.country);
                      }}
                    >
                      {person.name} : {person.formatted_address}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <Input name="r001_dic" type="text" label="DIČ" />
            <Input
              name="r002_datum_narodenia"
              type="text"
              label="Dátum narodenia"
            />

            <Input name="r003_nace" type="text" label="NACE" />

            <h3>Adresa trvalého pobytu</h3>
            <Input name="r007_ulica" type="text" label="Ulica" />
            <Input
              name="r008_cislo"
              type="text"
              label="Súpisné/orientačné číslo"
            />
            <Input
              name="r009_psc"
              type="text"
              label="PSČ"
              onChange={async e => {
                props.handleChange(e);
                const pscValue = e.target["value"];
                const trimmedPSC = pscValue.replace(/ /g, "");

                if (trimmedPSC.length === 5) {
                  const city = await getCity(trimmedPSC);
                  props.setFieldValue("r010_obec", city);
                }
              }}
            />
            <Input name="r010_obec" type="text" label="Obec" />
            <Input name="r011_stat" type="text" label="Štát" />

            <button className="govuk-button" type="submit">
              Dalej
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

const validationSchema = Yup.object().shape<PersonalInformationUserInput>({
  r001_dic: Yup.string()
    .required()
    .min(9),
  r002_datum_narodenia: Yup.string(),
  r003_nace: Yup.string(),
  r004_priezvisko: Yup.string().required(),
  r005_meno: Yup.string().required(),
  r007_ulica: Yup.string().required(),
  r008_cislo: Yup.string().required(),
  r009_psc: Yup.string().required(),
  r010_obec: Yup.string().required(),
  r011_stat: Yup.string().required(),
});
export default OsobneUdaje;
