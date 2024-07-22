import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'

export const bugReport11Input: E2eTestUserInput = {
  t1r10_prijmy: '97715.04',
  priloha3_r11_socialne: '37131.71',
  priloha3_r13_zdravotne: '7817.20',
  zaplatenePreddavky: '84033.55',
  employed: true,
  hasChildren: true,
  children: [
    {
      id: 0,
      priezviskoMeno: 'Fake Child 0',
      rodneCislo: '1107151672',
      wholeYear: true,
      monthFrom: '0',
      monthTo: '11',
    },
    {
      id: 1,
      priezviskoMeno: 'Fake Child 1',
      rodneCislo: '1955157644',
      wholeYear: true,
      monthFrom: '6',
      monthTo: '10',
    },
  ],
  r005_meno: 'Fake',
  r004_priezvisko: 'Name',
  r001_dic: '233123123',
  r003_nace: '62010 - Počítačové programovanie',
  r007_ulica: 'Mierova',
  r008_cislo: '4',
  r009_psc: '82105',
  r010_obec: 'Bratislava 3',
  r011_stat: 'Slovensko',
  datum: '22.02.2020',
  uhrnPrijmovOdVsetkychZamestnavatelov: '12460.28',
  uhrnPovinnehoPoistnehoNaSocialnePoistenie: '54869.90',
  uhrnPovinnehoPoistnehoNaZdravotnePoistenie: '33167.23',
  udajeODanovomBonuseNaDieta: '24930.41',
  uhrnPreddavkovNaDan: '26992.99',
  rent: true,
  vyskaPrijmovZPrenajmu: '5820.41',
  vydavkyZPrenajmu: '2075.59',
  prenajomPrijemZPrilezitostnejCinnosti: true,
  vyskaOslobodenia: '91.15',
  r035_uplatnuje_uroky: true,
  uroky_rok_uzatvorenia: '2020',
  uroky_zaciatok_urocenia_den: '21',
  uroky_zaciatok_urocenia_mesiac: '8',
  uroky_zaciatok_urocenia_rok: '2020',
  uroky_dalsi_dlznik: true,
  uroky_pocet_dlznikov: '2',
  r035_zaplatene_uroky: '6899.11',
  uroky_dalsi_uver_uplatnuje: false,
  uroky_splnam_vek_kriteria: true,
  uroky_splnam_prijem: true,
  platil_prispevky_na_dochodok: true,
  zaplatene_prispevky_na_dochodok: '45.99',
  expectNgoDonationValue: true,
  percent2: '54,90',
}
