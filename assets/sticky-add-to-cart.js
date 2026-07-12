if (!customElements.get('sticky-add-to-cart')) {
  customElements.define(
    'sticky-add-to-cart',
    class StickyAddToCart extends HTMLElement {
      constructor() {
        super();
        this.hasScrolled = false;
        this.sectionId = this.dataset.section;
        this.priceTarget = this.querySelector('[data-sticky-price]');
        this.submitButton = this.querySelector('[data-sticky-submit]');
      }

      connectedCallback() {
        this.targetButton = document.getElementById(`ProductSubmitButton-${this.sectionId}`);
        if (!this.targetButton) return;

        this.onScroll = () => {
          this.hasScrolled = true;
          window.removeEventListener('scroll', this.onScroll);
        };
        window.addEventListener('scroll', this.onScroll, { passive: true });

        this.observer = new IntersectionObserver(
          (entries) => {
            const isTargetVisible = entries[0].isIntersecting;
            this.classList.toggle('sticky-add-to-cart--visible', this.hasScrolled && !isTargetVisible);
          },
          { rootMargin: '0px 0px -10% 0px' }
        );
        this.observer.observe(this.targetButton);

        this.variantChangeUnsubscriber = subscribe(PUB_SUB_EVENTS.variantChange, (event) => {
          if (event.data.sectionId !== this.sectionId) return;
          this.updateFromVariant(event.data.variant, event.data.html);
        });
      }

      disconnectedCallback() {
        if (this.observer) this.observer.disconnect();
        if (this.onScroll) window.removeEventListener('scroll', this.onScroll);
        if (this.variantChangeUnsubscriber) this.variantChangeUnsubscriber();
      }

      updateFromVariant(variant, html) {
        if (this.priceTarget && html) {
          const newPrice = html.getElementById(`price-${this.sectionId}`);
          if (newPrice) this.priceTarget.innerHTML = newPrice.innerHTML;
        }

        if (!this.submitButton) return;

        if (!variant) {
          this.submitButton.setAttribute('disabled', 'disabled');
          this.submitButton.textContent = window.variantStrings?.unavailable || this.submitButton.textContent;
          return;
        }

        if (variant.available) {
          this.submitButton.removeAttribute('disabled');
          this.submitButton.textContent = this.dataset.addToCartText;
        } else {
          this.submitButton.setAttribute('disabled', 'disabled');
          this.submitButton.textContent = window.variantStrings?.soldOut || this.dataset.soldOutText;
        }
      }
    }
  );
}
