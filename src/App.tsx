/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Box, Button, TextField, Typography } from '@mui/material'
import BasicTable from './components/BasicTable'
import { sendFinancialTag, sendForexTag, sendInvestingTag } from './services/api'
import { useState, useRef } from 'react'

import './App.css'

interface Data {
  name: string,
  url: string,
  mainTag: string,
  timeTag: string,
  currecyTag: string,
  eventTag: string,
  actualTag: string,
  forecastTag: string,
  previousTag: string,
  time: string,
  currency: string,
  event: string,
  actual: string,
  forecast: string,
  previous: string,
}

interface Tags {
  tag: string;
  url: string;
}

function App() {

  const [tagsForex, setTagsForex] = useState<Tags[]>([]);
  const [dataForexTag, setDataForexTag] = useState('')
  const [urlForex, setUrlForex] = useState('')
  const [dataForex, setDataForex] = useState<Data[]>()
  const intervalForexRef = useRef<NodeJS.Timeout | null>(null);
  const [buttonInterval, setButtonInterval] = useState(true)


  const [tagsFinancial, setTagsFinancial] = useState<string[]>([]);
  const [dataFinancialTag, setDataFinancialTag] = useState('')
  const [dataFinancial, setDataFinancial] = useState<Data[]>()
  const intervalFinancialRef = useRef<NodeJS.Timeout | null>(null);
  const [buttonInterval2, setButtonInterval2] = useState(true)


  const [tagsInvesting, setTagsInvesting] = useState<Tags[]>([]);
  const [dataInvestingTag, setDataInvestingTag] = useState('')
  const [urlInvesting, setUrlInvesting] = useState('')
  const [dataInvesting, setDataInvesting] = useState<Data[]>()
  const intervalInvestingRef = useRef<NodeJS.Timeout | null>(null);
  const [buttonInterval3, setButtonInterval3] = useState(true)




  const [disableButton, setDisableButton] = useState(false);


  function handleClickForexButton(tag: string, url: string) {
    setDisableButton(true)
    stopForexInterval()

    setTimeout(() => {
      setDisableButton(false);
    }, 5000);

    const data = sendForexTag(tag, urlForex);

    void data.then((d) => {
      const newArray = dataForex ? [...dataForex] : [];
      newArray.push(d)
      console.log(d)
      addTagForex(tag, url)

      return setDataForex(newArray)
    })
  }


  function addTagForex(tag: string, url: string) {
    const object = { tag, url }
    const newArray = [...tagsForex];
    newArray.push(object)
    setTagsForex(newArray);
  }

  function removeTagForex(tagToRemove: string) {
    console.log(tagToRemove)
    stopForexInterval()
    setTagsForex(tagsForex.filter((o) => o.tag !== tagToRemove));
    setDataForex(dataForex?.filter((tag) => tag.mainTag !== tagToRemove));

  }

  function handleClickButton() {

    setButtonInterval(false)

    intervalForexRef.current = setInterval(async () => {
      const newData = await Promise.all(
        tagsForex.map(async (o) => {
          const data = await sendForexTag(o.tag, o.url);
          return { data };
        })
      );

      if (dataForex) {

        const newArray = [...dataForex]
        for (let i = 0; i < newArray.length; i++) {
          newData.forEach((data) => {
            if (newArray[i].mainTag === data.data.mainTag) {
              newArray[i].name = data.data.name
              newArray[i].url = data.data.url
              newArray[i].mainTag = data.data.mainTag
              newArray[i].timeTag = data.data.timeTag
              newArray[i].currecyTag = data.data.currecyTag
              newArray[i].eventTag = data.data.eventTag
              newArray[i].actualTag = data.data.actualTag
              newArray[i].forecastTag = data.data.forecastTag
              newArray[i].previousTag = data.data.previousTag
              newArray[i].time = data.data.time
              newArray[i].currency = data.data.currency
              newArray[i].event = data.data.event
              newArray[i].actual = data.data.actual
              newArray[i].forecast = data.data.forecast
              newArray[i].previous = data.data.previous
            }
          })
        }
        console.log(newArray)
        setDataForex(newArray)
      }

    }, 10000);
  }

  function stopForexInterval() {
    if (intervalForexRef.current !== null) {
      clearInterval(intervalForexRef.current);
      intervalForexRef.current = null;
    }
    setButtonInterval(true)
  }





  function handleClickFinancialButton(tag: string) {

    setDisableButton(true)
    stopFinancialInterval()

    setTimeout(() => {
      setDisableButton(false);
    }, 5000);

    const data = sendFinancialTag(tag);
    void data.then((d) => {
      const newArray = dataFinancial ? [...dataFinancial] : [];
      newArray.push(d)
      addTagFinancial(tag)

      return setDataFinancial(newArray)
    })
  }


  function addTagFinancial(tag: string) {
    const newArray = [...tagsFinancial];
    newArray.push(tag)
    setTagsFinancial(newArray);
  }

  function removeTagFinancial(tagToRemove: string) {

    stopFinancialInterval()
    setTagsFinancial(tagsFinancial.filter((tag) => tag !== tagToRemove));
    setDataFinancial(dataFinancial?.filter((tag) => tag.mainTag !== tagToRemove));
  }

  function handleClickButton2() {

    setButtonInterval2(false)

    intervalFinancialRef.current = setInterval(async () => {
      const newData = await Promise.all(
        tagsFinancial.map(async (tag) => {
          const data = await sendFinancialTag(tag);
          return { data };
        })
      );

      if (dataFinancial) {

        const newArray = [...dataFinancial]

        for (let i = 0; i < newArray.length; i++) {
          newData.forEach((data) => {
            if (newArray[i].mainTag === data.data.mainTag) {
              newArray[i].name = data.data.name
              newArray[i].url = data.data.url
              newArray[i].mainTag = data.data.mainTag
              newArray[i].timeTag = data.data.timeTag
              newArray[i].currecyTag = data.data.currecyTag
              newArray[i].eventTag = data.data.eventTag
              newArray[i].actualTag = data.data.actualTag
              newArray[i].forecastTag = data.data.forecastTag
              newArray[i].previousTag = data.data.previousTag
              newArray[i].time = data.data.time
              newArray[i].currency = data.data.currency
              newArray[i].event = data.data.event
              newArray[i].actual = data.data.actual
              newArray[i].forecast = data.data.forecast
              newArray[i].previous = data.data.previous
            }
          })
        }
        console.log(newArray)
        setDataFinancial(newArray)
      }

    }, 10000);
  }

  function stopFinancialInterval() {
    if (intervalFinancialRef.current !== null) {
      clearInterval(intervalFinancialRef.current);
      intervalFinancialRef.current = null;
    }
    setButtonInterval2(true)
  }





  function handleClickInvestingButton(tag: string, url: string) {

    setDisableButton(true)
    stopInvestingInterval()

    setTimeout(() => {
      setDisableButton(false);
    }, 5000);

    const data = sendInvestingTag(tag, urlInvesting);

    void data.then((d) => {
      const newArray = dataInvesting ? [...dataInvesting] : [];
      newArray.push(d)
      console.log(d)
      addTagInvesting(tag, url)

      return setDataInvesting(newArray)
    })
  }


  function addTagInvesting(tag: string, url: string) {
    const object = { tag, url }
    const newArray = [...tagsInvesting];
    newArray.push(object)
    setTagsInvesting(newArray);
  }

  function removeTagInvesting(tagToRemove: string) {

    stopInvestingInterval()
    setTagsInvesting(tagsInvesting.filter((o) => o.tag !== tagToRemove));
    setDataInvesting(dataInvesting?.filter((tag) => tag.mainTag !== tagToRemove));
  }

  function handleClickButton3() {

    setButtonInterval3(false)

    intervalInvestingRef.current = setInterval(async () => {
      const newData = await Promise.all(
        tagsInvesting.map(async (o) => {
          const data = await sendInvestingTag(o.tag, o.url);
          return { data };
        })
      );

      if (dataInvesting) {

        const newArray = [...dataInvesting]

        for (let i = 0; i < newArray.length; i++) {
          newData.forEach((data) => {
            if (newArray[i].mainTag === data.data.mainTag) {
              newArray[i].name = data.data.name
              newArray[i].url = data.data.url
              newArray[i].mainTag = data.data.mainTag
              newArray[i].timeTag = data.data.timeTag
              newArray[i].currecyTag = data.data.currecyTag
              newArray[i].eventTag = data.data.eventTag
              newArray[i].actualTag = data.data.actualTag
              newArray[i].forecastTag = data.data.forecastTag
              newArray[i].previousTag = data.data.previousTag
              newArray[i].time = data.data.time
              newArray[i].currency = data.data.currency
              newArray[i].event = data.data.event
              newArray[i].actual = data.data.actual
              newArray[i].forecast = data.data.forecast
              newArray[i].previous = data.data.previous
            }
          })
        }
        console.log(newArray)
        setDataInvesting(newArray)
      }

    }, 10000);
  }

  function stopInvestingInterval() {
    if (intervalInvestingRef.current !== null) {
      clearInterval(intervalInvestingRef.current);
      intervalInvestingRef.current = null;
    }
    setButtonInterval3(true)
  }


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 5 }}>
      <Typography sx={{ fontSize: '2.5rem', fontWeight: '700' }}>Data</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 5 }}>

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
          <TextField id="outlined-basic" label="Forex Factory Tags" variant="outlined" value={dataForexTag}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setDataForexTag(event.target.value);
            }} />
            <TextField id="outlined-basic" label="Forex Factory URL" variant="outlined" value={urlForex}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setUrlForex(event.target.value);
            }} />
          <Button disabled={disableButton} onClick={() => handleClickForexButton(dataForexTag, urlForex)} variant="contained">Buscar</Button>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
          <TextField id="outlined-basic" label="Financial Juice Tags" variant="outlined" value={dataFinancialTag}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setDataFinancialTag(event.target.value);
            }} />
          <Button disabled={disableButton} onClick={() => handleClickFinancialButton(dataFinancialTag)} variant="contained">Buscar</Button>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
          <TextField id="outlined-basic" label="Investing.com Tags" variant="outlined" value={dataInvestingTag}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setDataInvestingTag(event.target.value);
            }} />
            <TextField id="outlined-basic" label="Investing.com URL" variant="outlined" value={urlInvesting}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setUrlInvesting(event.target.value);
            }} />
          <Button onClick={() => handleClickInvestingButton(dataInvestingTag, urlInvesting)} disabled={disableButton} variant="contained">Buscar</Button>
        </Box>


      </Box>
      <Box sx={{ width: '75%', height: '100%', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 5 }}>
        {dataForex ? (
          <>
            <Box sx={{ width: '100%' }}>


              {dataForex.length > 0 && (
                <>
                  <Box sx={{ display: 'flex', justifyContent: 'start', alignIntems: 'center', gap: 2, marginBottom: 2 }}>
                    <Typography sx={{ fontSize: '2.5rem', fontWeight: '700' }}>ForexFactory</Typography>
                    {buttonInterval ?
                      <Button onClick={handleClickButton} variant="contained" sx={{ width: 'auto', height: 'auto' }}>Monitorar</Button>
                      :
                      <Button onClick={stopForexInterval} variant="contained" sx={{ width: 'auto', height: 'auto', backgroundColor: 'red', "&:hover": { backgroundColor: "red" } }}>Parar</Button>
                    }
                  </Box>
                  <BasicTable buttonInterval={buttonInterval} data={dataForex} removeTagForex={removeTagForex} />
                </>
              )}

            </Box>
          </>
        ) : ''}


        {dataFinancial ? (
          <>
            <Box sx={{ width: '100%' }}>

              {dataFinancial.length > 0 && (
                <>
                  <Box sx={{ display: 'flex', justifyContent: 'start', alignIntems: 'center', gap: 2, marginBottom: 2 }}>
                    <Typography sx={{ fontSize: '2.5rem', fontWeight: '700' }}>Financial Juice</Typography>
                    {buttonInterval2 ?
                      <Button onClick={handleClickButton2} variant="contained" sx={{ width: 'auto', height: 'auto' }}>Monitorar</Button>
                      :
                      <Button onClick={stopFinancialInterval} variant="contained" sx={{ width: 'auto', height: 'auto', backgroundColor: 'red', "&:hover": { backgroundColor: "red" } }}>Parar</Button>
                    }
                  </Box>
                  <BasicTable data={dataFinancial} removeTagFinancial={removeTagFinancial} buttonInterval2={buttonInterval2} />
                </>
              )}
            </Box>
          </>
        ) : ''}

        {dataInvesting ? (
          <>
            <Box sx={{ width: '100%' }}>

              {dataInvesting.length > 0 && (
                <>
                  <Box sx={{ display: 'flex', justifyContent: 'start', alignIntems: 'center', gap: 2, marginBottom: 2 }}>
                    <Typography sx={{ fontSize: '2.5rem', fontWeight: '700' }}>Investing.com</Typography>
                    {buttonInterval3 ?
                      <Button onClick={handleClickButton3} variant="contained" sx={{ width: 'auto', height: 'auto' }}>Monitorar</Button>
                      :
                      <Button onClick={stopInvestingInterval} variant="contained" sx={{ width: 'auto', height: 'auto', backgroundColor: 'red', "&:hover": { backgroundColor: "red" } }}>Parar</Button>
                    }
                  </Box>
                  <BasicTable data={dataInvesting} removeTagInvesting={removeTagInvesting} buttonInterval3={buttonInterval3} />
                </>
              )}
            </Box>
          </>
        ) : ''}
      </Box>
    </Box>
  )
}

export default App
