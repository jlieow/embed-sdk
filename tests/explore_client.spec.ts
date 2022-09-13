/*

 MIT License

 Copyright (c) 2019 Looker Data Sciences, Inc.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

 */

import type { ChattyHostConnection } from '@looker/chatty'
import { LookerEmbedExplore } from '../src/explore_client'

describe('ExplorerEmbedExplore', () => {
  let sendSpy: jasmine.Spy
  let sendAndReceiveSpy: jasmine.Spy
  let host: ChattyHostConnection
  let client: LookerEmbedExplore

  beforeEach(() => {
    sendSpy = jasmine.createSpy()
    sendAndReceiveSpy = jasmine.createSpy()
    host = {
      send: sendSpy,
      sendAndReceive: sendAndReceiveSpy,
    }
    client = new LookerEmbedExplore(host)
  })

  it('it relays messages', () => {
    client.send('a:message', { some: 'params' })
    expect(sendSpy).toHaveBeenCalledWith('a:message', { some: 'params' })
  })

  it('it runs', () => {
    client.run()
    expect(sendSpy).toHaveBeenCalledWith('look:run', undefined)
  })

  it('it sets filters', () => {
    client.updateFilters({ alpha: 'beta' })
    expect(sendSpy).toHaveBeenCalledWith('look:filters:update', {
      filters: { alpha: 'beta' },
    })
  })
})
