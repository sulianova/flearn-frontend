import type { ReactNode } from 'react';

interface IProps {
  href: string
  children: ReactNode
}

export default function Button({ href, children }: IProps) {
  return (
    <table border={0} cellSpacing="0" cellPadding="0" width="100%">
      <tbody>
        <tr>
          <td style={{ borderRadius:100, backgroundColor: '#262626' }} valign="middle" height="60" bgcolor="#262626" align="center" width="100%">
            <a href={href} style={{ fontFamily: 'Helvetica,Arial,sans-serif', fontSize: 16, lineHeight: '52px', fontWeight: 'normal', whiteSpace: 'nowrap', textDecoration: 'none', display: 'block', padding: '0px 32px', color: '#ffffff' }} target="_blank">
              <span style={{ color: '#ffffffff', textDecoration: 'none' }} color="#ffffffff">
                <span style={{ color: '#ffffffff' }}>
                  {children}
                </span>
              </span>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
