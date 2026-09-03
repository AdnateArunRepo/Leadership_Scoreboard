import { Injectable } from '@angular/core';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private readonly SAML_COOKIE_NAME = 'marutiinst_SAMLart';

  constructor() {

    if (typeof $ !== 'undefined' && $.cordys) {

    $.cordys.baseURL = '/home/Adnate';

    }

  }
  /**
   * Checks whether the AppWorks SSO cookie exists.
   */
  isLoggedIn(): boolean {

    //const samlArt = this.getCookie(this.SAML_COOKIE_NAME);
     const ct = this.getCookie('marutiinst_ct');

     console.log(
    'marutiinst_ct:',
    ct ? 'Present' : 'Not Present'
  );

    return !!ct && ct.trim() !== '';
  }

  /**
   * Gets a cookie value by cookie name.
   */
  private getCookie(name: string): string | null {

    const cookies = document.cookie.split(';');

    for (const cookie of cookies) {

      const trimmedCookie = cookie.trim();

      if (trimmedCookie.startsWith(name + '=')) {

        const value = trimmedCookie.substring(
          name.length + 1
        );

        return decodeURIComponent(value);
      }
    }

    return null;
  }
  /**
   * AppWorks/Cordys SSO authentication.
   */

  ssoAuthenticate(
    username: string,
    password: string
  ): Promise<void> {

    return new Promise<void>((resolve, reject) => {

      if (
        typeof $ === 'undefined' ||
        !$.cordys ||
        !$.cordys.authentication ||
        !$.cordys.authentication.sso
      ) {

        console.error(
          'Cordys SSO library is not available.'
        );

        reject(
          new Error(
            'Cordys SSO library is not available.'
          )
        );

        return;
      }

      $.cordys.authentication.sso

        .authenticate(
          username,
          password
        )

        .done(() => {

          console.log(
            `SSO authentication successful for: ${username}`
          );

          resolve();

        })

        .fail((err: any) => {

          console.warn(
            `SSO authentication failed for: ${username}`,
            err
          );

          reject(err);

        });

    });

  }

}