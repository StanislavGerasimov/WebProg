<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  
  <!-- Означаємо шаблон для перетворення кореневого елемента <student> -->
  <xsl:template match="/student">
    <html>
      <head>
        <title>Інформація про студента</title>
        <link rel="stylesheet" type="text/css" href="student.css"/>
      </head>
      <body>
        <h1>Інформація про студента</h1>
        <p><strong>Прізвище:</strong> <xsl:value-of select="surname"/></p>
        <p><strong>Ім'я:</strong> <xsl:value-of select="name"/></p>
        <p><strong>По батькові:</strong> <xsl:value-of select="patronymic"/></p>
        <p><strong>Попередня освіта:</strong> <xsl:value-of select="previous_education"/></p>
        <p><strong>Факультет:</strong> <xsl:value-of select="faculty"/></p>
      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>
