import { useState } from "react";

import { v4 as uuidv4 } from "uuid";

import {
  Autocomplete,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function SelectStation({
  linesData,
  stationsData,
  suffix,
  station,
  setStation,
  selectedLine,
  setSelectedLine,
}) {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const filteredLine = stationsData.filter(
    (station) => station.lineNumber == selectedLine
  );
  const handleStationSelect = (station) => {
    setStation(station);
    handleCloseDialog();
  };

  return (
    <>
      <TextField
        value={station?.stationName}
        onClick={handleOpenDialog}
        required
        sx={{
          width: "90%",
          maxWidth: "400px",
          backgroundColor: "#D9D9D9",
          borderRadius: 3,
        }}
        inputProps={{
          readOnly: true,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">ایستگاه {suffix}</InputAdornment>
          ),
        }}
      />

      <Dialog fullScreen open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            انتخاب ایستگاه {suffix}
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseDialog}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <div className="overflow-auto overflow-y-hidden flex items-center pt-4 pb-4">
            {linesData.map((line) => (
              <div
                key={line.id}
                style={{
                  minWidth: "fit-content",
                  backgroundColor: `${line.color}99`,
                  color: line.textColor ? line.textColor : "white",
                  boxShadow: `-5px 5px ${line.color}`,
                  transform: selectedLine == line.id ? "translateY(5px)" : "",
                }}
                className="py-2 px-4 mx-2 text-base rounded-xl cursor-pointer backdrop-blur-xl"
                onClick={() => setSelectedLine(line.id)}
              >
                {line.label}
              </div>
            ))}
          </div>
          <Autocomplete
            sx={{ margin: "20px 0 0 0" }}
            freeSolo
            id="station-search-input"
            disableClearable
            options={stationsData}
            getOptionLabel={(option) => option.stationName}
            getOptionKey={() => uuidv4()}
            renderInput={(params) => (
              <TextField
                {...params}
                label="جستجو"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
            onChange={(event, newValue) => {
              handleStationSelect(newValue);
            }}
          />
        </DialogTitle>
        <DialogContent>
          <List>
            {filteredLine.map((station) => (
              <ListItem
                button
                key={station.stationCode}
                onClick={() => handleStationSelect(station)}
              >
                <ListItemText primary={station.stationName} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SelectStation;
