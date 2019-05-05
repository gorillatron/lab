import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from '../store/reducer'
import * as actions from '../store/actions'

export default connect(
  (state: RootState) => state,
  (dispatch) => ({
    move: (direction: string) => dispatch(actions.move(direction))
  })
)((props) => {

  const { map, player, move } = props

  return (
    <div tabIndex={0} onKeyPress={(event => {
      if(event.charCode == 115)
        move('down')
      if(event.charCode == 119)
        move('up')
      if(event.charCode == 100)
        move('right')
      if(event.charCode == 97)
        move('left')
    })}>
      {
        map.geo.map((tileRow, rowIndex) => (
          <div key={rowIndex} style={{width: 40 * tileRow.length}}>
            {
              tileRow.map((tile, tileIndex) => (
                rowIndex == player.location.y && tileIndex == player.location.x ?
                  <div key={tileIndex} style={{backgroundColor: 'red', height: 40, width: 40, float: 'left'}}></div>
                :
                  <div key={tileIndex} style={{backgroundColor: tile.background, height: 40, width: 40, float: 'left'}}></div>
              ))
            }
          </div>
        ))
      }
    </div>
  )
})