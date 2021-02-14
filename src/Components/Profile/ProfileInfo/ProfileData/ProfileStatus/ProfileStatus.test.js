import ProfileStatus from "./ProfileStatus";
import {create} from 'react-test-renderer'

describe("ProfileStatus Component", () =>{
    test('Test Status in the span', ()=>{
        const component = create(<ProfileStatus status = 'creogenus on the test' />)
        const root = component.root;
        let span = root.findByType('span')
        expect(span.children[0]).toBe('creogenus on the test' )
    })
    test('Test Edit mode after clicking on the span', ()=>{
        const component = create(<ProfileStatus status = 'creogenus on the test' />)
        const root = component.root;
        let span = root.findByType('span')
        span.props.onDoubleClick();
        let input = root.findByType('input')
        expect(input.props.value).toBe( 'creogenus on the test')
    })
})