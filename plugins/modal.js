Element.prototype.appendAfter = function(element) {
    element.parentNode.insertBefore(this, element.nextSibling)
}
function noop(){}
function _createModelFooter(buttons =[]) {
    if (buttons.length === 0) {
        return document.createElement('div')
    }
    const wrap = document.createElement('div')
    wrap.classList.add('kmodal-footer')
    buttons.forEach(btn => {
        const $btn = document.createElement('button')
        $btn.textContent = btn.text
        $btn.classList.add('btn')
        $btn.classList.add(`btn-${btn.type}`)
        $btn.onclick = btn.handler || noop
        wrap.appendChild($btn)
    })

    return wrap
}
function _createModel(options) {
    const DEFAULT_WIDTH = '600px'
    const modal = document.createElement('div')
    modal.classList.add('kmodal')
    modal.insertAdjacentHTML('afterbegin', `
    <div class="kmodal-overlay" data-close="true">
        <div class="kmodal-window" style="width: ${options.width || DEFAULT_WIDTH}">
            <div class="kmodal-header">
                <span class="kmodal-title">${options.title || 'Window'}</span>
                ${options.closable ? `<span class="kmodal-close" data-close="true">&times;</span>` : ''}
            </div>
            <div class="kmodal-body" data-content>
                ${options.content || ''}
            </div>
        </div>
    </div>
    `)
    const footer = _createModelFooter(options.footerButtons)
    footer.appendAfter(modal.querySelector('[data-content]'))
    document.body.appendChild(modal)
    return modal
}


$.modal = function(options) {
    const ANIMATION_SPEED  = 200
    const $kmodal = _createModel(options)
    let closing = false
    let destroyed = false
    const modal = {
        open() {
            if(destroyed) {
                return console.log('modal is destroyed!')
            }
            !closing && $kmodal.classList.add('open')
        },
        close() {
            closing = true
            $kmodal.classList.remove('open')
            $kmodal.classList.add('hide')
            setTimeout(() => {
                $kmodal.classList.remove('hide')
                if (typeof options.onClose === 'function') {
                    options.onClose()
                }
                closing = false
            }, ANIMATION_SPEED)
        }
    }
    const listener = event => {
        if(event.target.dataset.close) {
            modal.close()
        }
    }
    $kmodal.addEventListener('click', listener)
    return Object.assign(modal, {
        destroy() {
            $kmodal.parentNode.removeChild($kmodal)
            $kmodal.removeEventListener('click', listener)
            destroyed = true
        },
        setContent(html) {
            $kmodal.querySelector('[data-content]').innerHTML= html
        }
    })
}