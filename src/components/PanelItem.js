import React from 'react'
import { Dimensions, Image, Platform, StyleSheet, Text, TouchableHighlight, View } from 'react-native'

export const windowWidth = Dimensions.get('window').width

export const dividerColor = StyleSheet.hairlineWidth < 1 ? '#bcbbc1' : 'rgba(0, 0, 0, 0.12)'
export const dividerStyle = { borderBottomWidth: StyleSheet.hairlineWidth, borderColor: dividerColor }

const defaultProps = {
  style: {},
  imageStyle: {},
  infoStyle: {},

  contextStyle: {},
  titleStyle: {},
  subtextStyle: {},

  size: null,
  horizontal: false,
  right: false,
  grid: false,
  wrapper: false
}

const ArticleImage = ({ horizontal, image, size, grid }) => {
  const imageStyle = (size === 'large' && grid === true) ? { height: 150 } : {}

  const imageContainerStyles = [styles.imageContainer, horizontal && styles.horizontalImage]
  const imageStyles = [styles.image, imageStyle, horizontal && styles.horizontalImage]

  const Component = (image) ? Image : View
  const props = (image) ? { source: { uri: image } } : {}

  return (
    <View style={[imageContainerStyles]}>
      <Component style={[imageStyles]} {...props} />
    </View>
  )
}

const getStyle = ({ horizontal, size, grid }) => {
  let pct = 0
  const gutter = 8 * 3

  // if (!horizontal && grid) pct = 1;
  // else

  if (!grid) {
    if (horizontal) pct = 0.85
    else if (size === 'large') pct = 0.80
    else if (size === 'small') pct = 0.50
  }

  return pct > 0 ? { width: (windowWidth * pct) - gutter } : {}
}

export default function PanelItem (props) {
  const { horizontal, right, wrapper } = props
  const { infoStyle, contextStyle, titleStyle, subtextStyle } = props

  const containerStyles = [styles.container, wrapper && styles.containerWrapper, getStyle(props)]
  const wrapperStyles = [{ flex: 1 }, horizontal && { flexDirection: 'row' }]

  const infoStyles = [styles.info, horizontal ? { marginHorizontal: 8 } : { marginTop: 0 }, (wrapper && !horizontal) && { padding: 12 }, infoStyle]
  const contextStyles = [styles.context, contextStyle]
  const titleStyles = [styles.title, titleStyle]
  const subtextStyles = [styles.subtext, subtextStyle]

  return (
    <View style={containerStyles}>
      <TouchableHighlight onPress={props.onPress} underlayColor='rgba(0, 0, 0, 0)'>

        <View style={wrapperStyles}>
          {/* Top and Left Image */}
          {(!right || !horizontal) && <ArticleImage {...props} />}

          <View style={infoStyles}>
            {props.context && <Text style={contextStyles} numberOfLines={1}>{props.context}</Text>}

            {props.title &&
              <Text style={titleStyles} numberOfLines={horizontal ? 2 : 3}>{props.title}</Text>}

            <View style={{ flexDirection: 'row', paddingVertical: 4 }}>
              {props.subtext && <Text style={subtextStyles} numberOfLines={2}>{props.subtext}</Text>}
              <View style={{ flex: 1 }} />
            </View>

          </View>

          {/* Right Image */}
          {right && horizontal && <ArticleImage {...props} />}

        </View>

      </TouchableHighlight>
    </View>
  )
};
PanelItem.defaultProps = defaultProps

// STYLES
const font = Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto'
const MIN_HEIGHT = 105

const styles = StyleSheet.create({
  container: {
    borderRadius: 8, flex: 1
  },

  containerWrapper: {
    backgroundColor: '#fff',
    shadowColor: '#c2c4cb',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.81,
    shadowRadius: 5.16,
    elevation: 20
  },

  imageContainer: {
    backgroundColor: '#eee',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden'
  },

  horizontalImage: {
    width: MIN_HEIGHT,
    height: MIN_HEIGHT
  },

  image: {
    height: MIN_HEIGHT
  },

  info: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 8
  },

  context: {
    color: '#D66215',
    marginBottom: 4,
    fontSize: 14,
    fontWeight: '400',
    fontFamily: font
  },

  title: {
    fontSize: 15,
    fontWeight: '500',
    fontFamily: font,
    color: '#363434',
    marginBottom: 6,
    flex: 1
  },

  subtext: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: font,
    color: '#A5A5A4',
    marginRight: 5
  },

  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    borderRadius: 8
  },

  columns: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})
