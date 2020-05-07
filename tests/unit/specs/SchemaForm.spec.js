import Vue from 'vue'
import Buefy from 'buefy'
import { mount } from '@vue/test-utils'
import SchemaForm from '@/components/SchemaForm'

Vue.use(Buefy)

describe('SchemaForm.vue', () => {
  const firstName = 'Chuck'
  const wrapper = mount(SchemaForm, {
    propsData: {
      schema: {
        title: 'A registration form',
        description: 'A simple form example.',
        type: 'object',
        required: ['firstName'],
        properties: {
          firstName: {
            type: 'string',
            title: 'First name',
            default: firstName
          }
        }
      }
    }
  })

  it('should render a field', () => {
    expect(wrapper.find('.field')).toBeDefined()
  })
  it('should render correct label', () => {
    expect(wrapper.find('.field .label').html()).toContain('First name')
  })
  // it('should have a isValid property set to true')
  it('should have the firstName property', () => {
    expect(wrapper.vm.item.firstName).toBe(firstName)
  })
  it('should be invalid with invalid input', async done => {
    wrapper.vm.item.firstName = ''
    await Vue.nextTick()
    expect(wrapper.vm.isValid).toBe(false)
    done()
  })
  it('should be valid with valid input', async done => {
    wrapper.vm.item.firstName = firstName
    const isValid = wrapper.vm.checkValidity()

    expect(isValid).toBe(true)
    done()
  })
})
