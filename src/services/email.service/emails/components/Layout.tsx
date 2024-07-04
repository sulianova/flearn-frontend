import type { ReactNode } from 'react'

import { URLSections } from 'router'

import type { IEmailContact } from '../../types'

interface IProps {
  to: IEmailContact
  title: string
  content: ReactNode[]
  gapPx?: number
}

export default function Layout({ title, content, to: { email }, gapPx }: IProps) {
  const unsubscribeLink = URLSections.Static.Unsubscribe.to({ params: { email }, full: true });
  
  const separator = gapPx && (
    <tr>
      <td align="center">
        <table width="100%" border={0} cellSpacing="0" cellPadding="0">
          <tbody>
            <tr>
              <td style={{ lineHeight: `${gapPx}px`, fontSize:0 }} height={gapPx}></td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  );

  return (
    <html lang="ru">
      <head>
        <meta charSet="UTF-8" />
        <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
      </head>
      <body>
        <table width="100%" style={{ padding: 0, margin: 0, overflowX: 'hidden' }}>
          <tbody>
            <tr>
              <td>
                <table align="center" width="100%" border={0} cellSpacing="0" cellPadding="0"
                  style={{ marginTop: '8px', lineHeight:'normal', wordBreak:'normal' }}>
                  <tbody>
                    <tr>
                      <td align="center" bgcolor="#f5f5f5" style={{ backgroundColor: '#f5f5f5', padding: '10px' }}>
                        <table width="100%" border={0} cellSpacing="0" cellPadding="0" style={{ maxWidth: '600px' }}>
                          <tbody>
                            <tr>
                              <td>
                                <table align="center" width="100%" border={0} cellSpacing="0" cellPadding="0"
                                  style={{ marginTop: '8px', lineHeight: 'normal', wordBreak:'normal' }}>
                                  <tbody>
                                    <tr>
                                      <td align="center" bgcolor="#f5f5f5" style={{ backgroundColor: '#f5f5f5', padding: '10px' }}>
                                        <table width="100%" border={0} cellSpacing="0" cellPadding="0" style={{ maxWidth: '600px' }}>
                                          <tbody>
                                            <tr>
                                              <td
                                                style={{ backgroundColor: '#f5f5f5', padding: '26px 8px 0px', borderTopLeftRadius: '25px', borderTopRightRadius: '25px' }}
                                                bgcolor="#f5f5f5" align="center">
                                                <table style={{ maxWidth: '540px', borderSpacing: '0px' }} width="100%" cellSpacing="0"
                                                  cellPadding="0" border={0}>
                                                  <tbody>
                                                    <tr>
                                                      <td align="left">
                                                        <table width="100%" cellSpacing="0" cellPadding="0" border={0}>
                                                          <tbody>
                                                            <tr>
                                                              <td style={{ fontSize: '0px', lineHeight: '0px' }} valign="middle"
                                                                align="left">
                                                                <table width="100%" cellSpacing="0" cellPadding="0" border={0}>
                                                                  <tbody>
                                                                    <tr>
                                                                      <td style={{ fontSize: '14px', lineHeight: '16px' }} align="left">
                                                                        <table width="100%" cellSpacing="0" cellPadding="0"
                                                                          border={0}>
                                                                          <tbody>
                                                                            <tr>
                                                                              <td align="left">
                                                                                <a style={{ fontFamily: 'Arial, Tahoma,Helvetica,sans-serif', fontSize: '18px', textDecoration: 'none', color: '#262626' }}
                                                                                  href="https://flearn.net">
                                                                                  Freadom to Learn
                                                                                </a>
                                                                              </td>
                                                                            </tr>
                                                                          </tbody>
                                                                        </table>
                                                                        <table width="100%" cellSpacing="0" cellPadding="0" border={0}>
                                                                          <tbody>
                                                                            <tr>
                                                                              <td style={{ fontSize: '0px', lineHeight: '25px' }} height="25">
                                                                              </td>
                                                                            </tr>
                                                                          </tbody>
                                                                        </table>
                                                                      </td>
                                                                    </tr>
                                                                  </tbody>
                                                                </table>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                        <table width="100%" border={0} cellSpacing="0" cellPadding="0" style={{ maxWidth: '600px' }}>
                                          <tbody>
                                            {content.map((c, index) => {
                                              if (index === 0) {
                                                return c;
                                              }
                                              return [
                                                separator,
                                                c,
                                              ];
                                            }).flatMap(c => c)}
                                            <tr>
                                              <td>
                                                <table width="100%" border={0} cellSpacing="0" cellPadding="0">
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        style={{ padding: '30px 20px 50px', fontFamily: 'Helvetica,Arial,sans-serif', fontSize: '12px', lineHeight: '16px', color: '#808080' }}
                                                        align="left">
                                                        <span>
                                                          ©&nbsp;2023-2024&nbsp;flearn
                                                          <br/>
                                                          <br/>
                                                          Письмо создано автоматически, пожалуйста, не отвечайте на него. Чтобы
                                                          отписаться от рассылки, перейдите
                                                          <a href={unsubscribeLink}
                                                            style={{ fontFamily: 'Helvetica,Arial,sans-serif', fontSize: '12px', lineHeight: '16px', fontWeight:'normal', whiteSpace: 'nowrap', textDecoration: 'underline', color: '#808080' }}
                                                            target="_blank">
                                                            <span style={{ color: '#808080', textDecoration: 'none' }} color="#808080">
                                                              <span style={{ color: '#808080' }}>по этой ссылке.</span>
                                                            </span>
                                                          </a>
                                                        </span>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
}
