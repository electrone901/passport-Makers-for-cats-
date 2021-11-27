import React, { useRef, useEffect } from 'react'
import WebViewer from '@pdftron/webviewer'
import './App.css'
import catlogo from './catlogo.png'

const App = () => {
  const viewer = useRef(null)
  const nowDate = new Date()
  const date =
    nowDate.getFullYear() +
    '/' +
    (nowDate.getMonth() + 1) +
    '/' +
    nowDate.getDate()
  console.log('🚀 ~ file: App.js ~ line 9 ~ App ~ date', date)

  // if using a class, equivalent of componentDidMount
  useEffect(() => {
    WebViewer(
      {
        path: '/webviewer/lib',
        initialDoc: '/files/p.pdf',
      },
      viewer.current,
    ).then((instance) => {
      const { documentViewer, annotationManager, Annotations } = instance.Core

      const { WidgetFlags } = Annotations

      documentViewer.addEventListener('documentLoaded', () => {
        // new
        // set flags for multiline and required
        const flags = new WidgetFlags()
        flags.set('Multiline', false)
        flags.set('Required', false)

        // create a form field
        const field = new Annotations.Forms.Field('some text field name', {
          type: 'Tx',
          value: 'NX0019390-4567',
          flags,
        })

        // create a widget annotation
        const widgetAnnot = new Annotations.TextWidgetAnnotation(field)

        // set position and size
        widgetAnnot.PageNumber = 1
        widgetAnnot.X = 450
        widgetAnnot.Y = 80
        widgetAnnot.Width = 150
        widgetAnnot.Height = 20

        //add the form field and widget annotation
        annotationManager.addAnnotation(widgetAnnot)
        annotationManager.drawAnnotationsFromList([widgetAnnot])
        annotationManager.getFieldManager().addField(field)

        // create a form field
        // const dateNow = new Annotations.Forms.Field('some text field name', {
        //   type: 'Tx',
        //   value: date,
        // })

        // // create  date
        // const widgetAnnotDate = new Annotations.TextWidgetAnnotation(dateNow)

        // // set position and size
        // widgetAnnot.PageNumber = 1
        // widgetAnnot.X = 250
        // widgetAnnot.Y = 80
        // widgetAnnot.Width = 150
        // widgetAnnot.Height = 20

        // //add the form field and widget annotation
        // annotationManager.addAnnotation(widgetAnnotDate)
        // annotationManager.drawAnnotationsFromList([widgetAnnotDate])
        // annotationManager.getFieldManager().addField(dateNow)

        // const rectangleAnnot = new Annotations.RectangleAnnotation({
        //   PageNumber: 1,
        //   // values are in page coordinates with (0, 0) in the top left
        //   X: 450,
        //   Y: 80,
        //   Width: 150,
        //   Height: 30,
        //   Author: annotationManager.getCurrentUser(),
        //   text: 'some placeholder default text value',
        // })

        // annotationManager.addAnnotation(rectangleAnnot)
        // // need to draw the annotation otherwise it won't show up until the page is refreshed
        // annotationManager.redrawAnnotation(rectangleAnnot)
      })
    })
  }, [])

  return (
    <div className="App">
      <div className="header">Cat Passport</div>
      <div className="webviewer" ref={viewer}></div>
    </div>
  )
}

export default App
