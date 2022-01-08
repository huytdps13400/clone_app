import { Box } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import { GoogleMap, Marker, Polygon, withGoogleMap, withScriptjs } from 'react-google-maps';
import CmtCard from '../../../../@coremat/CmtCard';
import { compose, withProps } from 'recompose';

const useStyles = makeStyles(() => ({
  cardRoot: {
    height: '100%',
    minHeight: 350,
  },
}));

const MyMapComponent = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAwxbtyZOj-gHbZ9vB4U9SR7CPsugrXEzg',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
)(props => (
  <GoogleMap
    defaultCenter={
      props.area
        ? {
            lat: props.area && Number(props.area[0][0].latitude),
            lng: props.area && Number(props.area[0][0].longitude),
          }
        : props.danger
        ? {
            lat: props.danger && Number(props.danger[0][0].latitude),
            lng: props.danger && Number(props.danger[0][0].longitude),
          }
        : {
            lat: 10.773667,
            lng: 106.716417,
          }
    }
    defaultZoom={15}>
    {props.isMarkerShown &&
      props.area &&
      props.area?.map((items, x) => {
        return (
          <div key={x}>
            {items?.map((item, index) => {
              const reversedCoords = items?.map(ll => {
                return { lat: Number(ll.latitude), lng: Number(ll.longitude) };
              });
              return (
                <>
                  <Marker key={index} position={{ lat: Number(item.latitude), lng: Number(item.longitude) }} />
                  <Polygon
                    path={reversedCoords}
                    options={{
                      fillColor: `#2196F3`,
                      strokeColor: `#2196F3`,
                      fillOpacity: 0.1,
                      strokeWeight: 2,
                      clickable: true,
                      editable: false,
                      draggable: false,
                      zIndex: 1,
                    }}
                  />
                </>
              );
            })}
          </div>
        );
      })}
    {props.isMarkerShown &&
      props.danger &&
      props.danger?.map((items, y) => {
        return (
          <div key={y}>
            {items?.map((item, index) => {
              const reversedCoords = items?.map(ll => {
                return { lat: Number(ll.latitude), lng: Number(ll.longitude) };
              });
              return (
                <>
                  <Marker key={index} position={{ lat: Number(item.latitude), lng: Number(item.longitude) }} />
                  <Polygon
                    path={reversedCoords}
                    options={{
                      fillColor: `#f00`,
                      strokeColor: `#f00`,
                      fillOpacity: 0.1,
                      strokeWeight: 2,
                      clickable: true,
                      editable: false,
                      draggable: false,
                      zIndex: 1,
                    }}
                  />
                </>
              );
            })}
          </div>
        );
      })}
  </GoogleMap>
));

const MapWidget = ({ area, danger }) => {
  const classes = useStyles();
  return (
    <CmtCard className={classes.cardRoot}>
      <Box p={2} height={1}>
        <MyMapComponent isMarkerShown area={area} danger={danger} />
      </Box>
    </CmtCard>
  );
};

export default MapWidget;
