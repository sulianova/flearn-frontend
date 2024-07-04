import type { ReactNode } from 'react';

interface IContentItem {
  value: ReactNode
  paddingTop?: number
  paddingBottom?: number
}

interface IProps {
  content: IContentItem[]
}

export default function Card({ content }: IProps) {
  return (
    <>
      <tr>
        <td style={{ backgroundColor: '#ffffff', borderTopLeftRadius: '25px', borderTopRightRadius: '25px' }} bgcolor="#ffffffff" align="center">
          <table style={{ maxWidth: '540px', borderSpacing: '0px' }} width="100%" border={0} cellSpacing="0" cellPadding="0">
            <tbody>
              <tr>
                <td style={{ lineHeight: '25px', fontSize: 0 }} height="25"/>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      {content.map(c => (
        <tr>
          <td style={{ backgroundColor: '#ffffff', padding: `${c.paddingTop ?? 0}px 20px ${c.paddingBottom ?? 0}px` }} bgcolor="#ffffffff" align="center">
            <table style={{ maxWidth: '540px', borderSpacing: '0px' }} width="100%" border={0} cellSpacing="0" cellPadding="0">
              <tbody>
                {c.value}
              </tbody>
            </table>
          </td>
        </tr>
      ))}
      <tr>
        <td
          style={{ backgroundColor: '#ffffff', borderBottomLeftRadius: '25px', borderBottomRightRadius: '25px' }}
          bgcolor="#ffffff" align="center">
          <table style={{ maxWidth: '540px', borderSpacing: '0px' }} width="100%" border={0} cellSpacing="0" cellPadding="0">
            <tbody>
              <tr>
                <td style={{ lineHeight: '25px', fontSize: '0px' }} height="25"/>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </>
  );
}
