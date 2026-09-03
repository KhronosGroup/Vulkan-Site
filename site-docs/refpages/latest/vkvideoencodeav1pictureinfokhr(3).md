# VkVideoEncodeAV1PictureInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeAV1PictureInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeAV1PictureInfoKHR - Structure specifies AV1 encode frame parameters

The [VkVideoEncodeAV1PictureInfoKHR](#) structure is defined as:

// Provided by VK_KHR_video_encode_av1
typedef struct VkVideoEncodeAV1PictureInfoKHR {
    VkStructureType                        sType;
    const void*                            pNext;
    VkVideoEncodeAV1PredictionModeKHR      predictionMode;
    VkVideoEncodeAV1RateControlGroupKHR    rateControlGroup;
    uint32_t                               constantQIndex;
    const StdVideoEncodeAV1PictureInfo*    pStdPictureInfo;
    int32_t                                referenceNameSlotIndices[VK_MAX_VIDEO_AV1_REFERENCES_PER_FRAME_KHR];
    VkBool32                               primaryReferenceCdfOnly;
    VkBool32                               generateObuExtensionHeader;
} VkVideoEncodeAV1PictureInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`predictionMode` specifies the [AV1    prediction mode](../../../../spec/latest/chapters/videocoding.html#encode-av1-prediction-modes) to use for the encoded frame.

* 
`rateControlGroup` specifies the [AV1    rate control group](../../../../spec/latest/chapters/videocoding.html#encode-av1-rate-control-group) to use for the encoded frame when the current
[rate control mode](../../../../spec/latest/chapters/videocoding.html#encode-rate-control-modes) is not
[VK_VIDEO_ENCODE_RATE_CONTROL_MODE_DISABLED_BIT_KHR](VkVideoEncodeRateControlModeFlagBitsKHR.html).
Otherwise it is ignored.

* 
`constantQIndex` is the quantizer index to use for the encoded frame
if the current [rate control mode](../../../../spec/latest/chapters/videocoding.html#encode-rate-control-modes)
configured for the video session is
[VK_VIDEO_ENCODE_RATE_CONTROL_MODE_DISABLED_BIT_KHR](VkVideoEncodeRateControlModeFlagBitsKHR.html).

* 
`pStdPictureInfo` is a pointer to a
`StdVideoEncodeAV1PictureInfo` structure specifying
[AV1 picture information](../../../../spec/latest/chapters/videocoding.html#encode-av1-picture-info).

* 
`referenceNameSlotIndices` is an array of seven
([VK_MAX_VIDEO_AV1_REFERENCES_PER_FRAME_KHR](VK_MAX_VIDEO_AV1_REFERENCES_PER_FRAME_KHR.html), which is equal to the
Video Std definition `STD_VIDEO_AV1_REFS_PER_FRAME`) signed integer
values specifying the index of the [DPB slot](../../../../spec/latest/chapters/videocoding.html#dpb-slot) or a negative
integer value for each [AV1 reference name](../../../../spec/latest/chapters/videocoding.html#encode-av1-reference-names)
used for inter coding.
In particular, the DPB slot index for the AV1 reference name `frame`
is specified in `referenceNameSlotIndices`[`frame` -
`STD_VIDEO_AV1_REFERENCE_NAME_LAST_FRAME`].

* 
`primaryReferenceCdfOnly` controls whether the primary reference
frame indicated by the value of `pStdPictureInfo->primary_ref_frame`
is used only for CDF data reference, as defined in sections 6.8.2 of the
[AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1).
If set to [VK_TRUE](VK_TRUE.html), then the primary reference frame’s picture data
will not be used for sample prediction.

* 
`generateObuExtensionHeader` controls whether OBU extension headers
are generated into the target bitstream, as defined in sections 5.3.1,
5.3.2, and 5.3.3 of the [AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1).

This structure is specified in the `pNext` chain of the
[VkVideoEncodeInfoKHR](VkVideoEncodeInfoKHR.html) structure passed to [vkCmdEncodeVideoKHR](vkCmdEncodeVideoKHR.html) to
specify the codec-specific picture information for an [AV1 encode operation](../../../../spec/latest/chapters/videocoding.html#encode-av1).

Encode Input Picture Information

When this structure is specified in the `pNext` chain of the
[VkVideoEncodeInfoKHR](VkVideoEncodeInfoKHR.html) structure passed to [vkCmdEncodeVideoKHR](vkCmdEncodeVideoKHR.html),
the information related to the [encode input picture](../../../../spec/latest/chapters/videocoding.html#encode-input-picture-info) is defined as follows:

* 
The image subregion used is determined according to the
[AV1 Encode Picture Data Access](../../../../spec/latest/chapters/videocoding.html#encode-av1-picture-data-access)
section.

* 
The encode input picture is associated with the
[AV1 picture information](../../../../spec/latest/chapters/videocoding.html#encode-av1-picture-info) provided in
`pStdPictureInfo`.

Std Picture Information

The members of the `StdVideoEncodeAV1PictureInfo` structure pointed to by
`pStdPictureInfo` are interpreted as follows:

* 
`flags.reserved` and `reserved1` are used only for padding
purposes and are otherwise ignored;

* 
`pSegmentation` **must** be `NULL`

|  | AV1 segmentation is currently not supported in video encode operations.
| --- | --- |
Accordingly, the application needs to set `flags.segmentation_enabled` to
`0` and `pSegmentation` to `NULL`. |

* 
`pTileInfo` is `NULL` or a pointer to a `StdVideoAV1TileInfo`
structure specifying [AV1 tile parameters](../../../../spec/latest/chapters/videocoding.html#encode-av1-tile-params);

* 
the `StdVideoAV1Quantization` structure pointed to by
`pQuantization` is interpreted as follows:

`flags.reserved` is used only for padding purposes and is otherwise
ignored;

* 
all other members of `StdVideoAV1Quantization` are interpreted as
defined in section 6.8.11 of the [AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1);

the `StdVideoAV1LoopFilter` structure pointed to by `pLoopFilter`
is interpreted as follows:

* 
`flags.reserved` is used only for padding purposes and is otherwise
ignored;

* 
`update_ref_delta` is a bitmask where bit index i is
interpreted as the value of `update_ref_delta` corresponding to
element i of `loop_filter_ref_deltas` as defined in section
6.8.10 of the [AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1);

* 
`update_mode_delta` is a bitmask where bit index i is
interpreted as the value of `update_mode_delta` corresponding to
element i of `loop_filter_mode_deltas` as defined in section
6.8.10 of the [AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1);

* 
all other members of `StdVideoAV1LoopFilter` are interpreted as
defined in section 6.8.10 of the [AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1);

if `flags.enable_cdef` is set in the
[active sequence header](../../../../spec/latest/chapters/videocoding.html#encode-av1-active-sequence-header), then the
members of the `StdVideoAV1CDEF` structure pointed to by `pCDEF`
are interpreted as follows:

* 
`cdef_y_sec_strength` and `cdef_uv_sec_strength` are the
bitstream values of the corresponding syntax elements defined in
section 5.9.19 of the [AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1);

* 
all other members of `StdVideoAV1CDEF` are interpreted as defined in
section 6.10.14 of the [AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1);

if `flags.UsesLr` is set in the
[active sequence header](../../../../spec/latest/chapters/videocoding.html#encode-av1-active-sequence-header), then the
`StdVideoAV1LoopRestoration` structure pointed to by
`pLoopRestoration` is interpreted as follows:

* 
`LoopRestorationSize`[`plane`] is interpreted as
log2(`size`) - 5, where `size` is the value of
`LoopRestorationSize`[`plane`] as defined in section 6.10.15 of
the [AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1);

* 
all other members of `StdVideoAV1LoopRestoration` are defined as in
section 6.10.15 of the [AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1);

the members of the `StdVideoAV1GlobalMotion` structure pointed to by
`pGlobalMotion` are interpreted as defined in section 7.10 of the
[AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1);

`pExtensionHeader` is `NULL` or a pointer to a
`StdVideoEncodeAV1ExtensionHeader` structure whose `temporal_id`
and `spatial_id` members specify the temporal and spatial layer ID of
the reference frame, respectively (these IDs are encoded into the OBU
extension header if
[VkVideoEncodeAV1PictureInfoKHR](#)::`generateObuExtensionHeader`
is set to [VK_TRUE](VK_TRUE.html) for the encode operation);

if `flags.buffer_removal_time_present_flag` is set, then
`pBufferRemovalTimes` is a pointer to an array of N number of
unsigned integer values specifying the elements of the
`buffer_removal_time` array, as defined in section 6.8.2 of the
[AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1), where N is the number of
operating points specified for the
[active sequence header](../../../../spec/latest/chapters/videocoding.html#encode-av1-active-sequence-header) through
[VkVideoEncodeAV1SessionParametersCreateInfoKHR](VkVideoEncodeAV1SessionParametersCreateInfoKHR.html)::`stdOperatingPointCount`;

all other members are interpreted as defined in section 6.8 of the
[AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1).

Reference picture setup is controlled by the value of
`StdVideoEncodeAV1PictureInfo`::`refresh_frame_flags`.
If it is not zero and a [reconstructed picture](../../../../spec/latest/chapters/videocoding.html#encode-reconstructed-picture-info) is specified, then the latter is used as the target of picture
reconstruction to [activate](../../../../spec/latest/chapters/videocoding.html#dpb-slot-states) the [DPB slot](../../../../spec/latest/chapters/videocoding.html#dpb-slot)
specified in `pEncodeInfo->pSetupReferenceSlot→slotIndex`.
If `StdVideoEncodeAV1PictureInfo`::`refresh_frame_flags` is zero, but
a [reconstructed picture](../../../../spec/latest/chapters/videocoding.html#encode-reconstructed-picture-info) is specified,
then the corresponding picture reference associated with the [DPB slot](../../../../spec/latest/chapters/videocoding.html#dpb-slot) is invalidated, as described in the [DPB Slot States](../../../../spec/latest/chapters/videocoding.html#dpb-slot-states) section.

Std Tile Parameters

Specifying AV1 tile parameters is optional.
If `StdVideoEncodeAV1PictureInfo`::`pTileInfo` is `NULL`, then the
implementation determines the values of AV1 tile parameters defined in
section 6.8.14 of the [AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1) in an
implementation-dependent manner.
If `StdVideoEncodeAV1PictureInfo`::`pTileInfo` is not `NULL`, then the
members of the `StdVideoAV1TileInfo` structure pointed to by
`StdVideoEncodeAV1PictureInfo`::`pTileInfo` are interpreted as
follows:

* 
`flags.reserved` and `reserved1` are used only for padding
purposes and are otherwise ignored;

* 
`TileCols` and `TileRows` specify the number of tile columns and
tile rows as defined in section 6.8.14 of the [AV1    Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1);

* 
`tile_size_bytes_minus_1` is ignored, as its value, as defined in
section 6.8.14 of the [AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1), is determined
as the result of the encoding process;

* 
`pMiColStarts` and `pMiRowStarts` are ignored, as the elements of
the `MiColStarts` and `MiRowStarts` arrays defined in section
6.8.14 of the [AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1) are determined by the
implementation based on the tile widths and heights determined by the
implementation or specified through the `pWidthInSbsMinus1` and
`pHeightInSbsMinus1` arrays, respectively;

* 
`pWidthInSbsMinus1` is `NULL` or a pointer to an array of
`TileCols` number of unsigned integers that corresponds to
`width_in_sbs_minus_1` defined in section 6.8.14 of the
[AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1);

* 
`pHeightInSbsMinus1` is `NULL` or is a pointer to an array of
`TileRows` number of unsigned integers that corresponds to
`height_in_sbs_minus_1` defined in section 6.8.14 of the
[AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1);

* 
all other members of `StdVideoAV1TileInfo` are interpreted as defined
in section 6.8.14 of the [AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1).

If `flags.uniform_tile_spacing_flag` is set, then `pWidthInSbsMinus1`
and `pHeightInSbsMinus1` are ignored.

If `flags.uniform_tile_spacing_flag` is not set and
`pWidthInSbsMinus1` is `NULL`, then the width of individual tile columns
is determined in an implementation-dependent manner.

If `flags.uniform_tile_spacing_flag` is not set and
`pHeightInSbsMinus1` is `NULL`, then the height of individual tile rows
is determined in an implementation-dependent manner.

|  | In general, implementations are expected to respect the
| --- | --- |
application-specified AV1 tile parameters.
However, as implementations may have restrictions on the combination of tile
column and row counts, and tile widths and heights with respect to the
extent of the encoded frame beyond the restrictions specified in the
[AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1) and this specification (through video
profile capabilities), certain parameter combinations may require the
implementation to [override](../../../../spec/latest/chapters/videocoding.html#encode-overrides) them in order to conform to
such implementation-specific limitations. |

Active Parameter Sets

The *active sequence header* is the [AV1 sequence header](../../../../spec/latest/chapters/videocoding.html#encode-av1-sequence-header) stored in the bound video session parameters object.

Valid Usage

* 
[](#VUID-VkVideoEncodeAV1PictureInfoKHR-flags-10289) VUID-VkVideoEncodeAV1PictureInfoKHR-flags-10289

If [VkVideoEncodeAV1CapabilitiesKHR](VkVideoEncodeAV1CapabilitiesKHR.html)::`flags`, as returned by
[vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the used video
profile, does not include
[VK_VIDEO_ENCODE_AV1_CAPABILITY_PRIMARY_REFERENCE_CDF_ONLY_BIT_KHR](VkVideoEncodeAV1CapabilityFlagBitsKHR.html),
then `primaryReferenceCdfOnly` **must** be [VK_FALSE](VK_FALSE.html)

* 
[](#VUID-VkVideoEncodeAV1PictureInfoKHR-primaryReferenceCdfOnly-10290) VUID-VkVideoEncodeAV1PictureInfoKHR-primaryReferenceCdfOnly-10290

If `primaryReferenceCdfOnly` is set to [VK_TRUE](VK_TRUE.html), then
`pStdPictureInfo->primary_ref_frame` **must** be less than
[VK_MAX_VIDEO_AV1_REFERENCES_PER_FRAME_KHR](VK_MAX_VIDEO_AV1_REFERENCES_PER_FRAME_KHR.html)

* 
[](#VUID-VkVideoEncodeAV1PictureInfoKHR-pStdPictureInfo-10291) VUID-VkVideoEncodeAV1PictureInfoKHR-pStdPictureInfo-10291

If `pStdPictureInfo->primary_ref_frame` is less than
[VK_MAX_VIDEO_AV1_REFERENCES_PER_FRAME_KHR](VK_MAX_VIDEO_AV1_REFERENCES_PER_FRAME_KHR.html), then
`referenceNameSlotIndices`[`pStdPictureInfo->primary_ref_frame`]
**must** not be negative

* 
[](#VUID-VkVideoEncodeAV1PictureInfoKHR-flags-10292) VUID-VkVideoEncodeAV1PictureInfoKHR-flags-10292

If [VkVideoEncodeAV1CapabilitiesKHR](VkVideoEncodeAV1CapabilitiesKHR.html)::`flags`, as returned by
[vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the used video
profile, does not include
[VK_VIDEO_ENCODE_AV1_CAPABILITY_GENERATE_OBU_EXTENSION_HEADER_BIT_KHR](VkVideoEncodeAV1CapabilityFlagBitsKHR.html),
then `generateObuExtensionHeader` **must** be [VK_FALSE](VK_FALSE.html)

* 
[](#VUID-VkVideoEncodeAV1PictureInfoKHR-generateObuExtensionHeader-10293) VUID-VkVideoEncodeAV1PictureInfoKHR-generateObuExtensionHeader-10293

If `generateObuExtensionHeader` is set to [VK_TRUE](VK_TRUE.html), then
`pStdPictureInfo->pExtensionHeader` **must** not be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-VkVideoEncodeAV1PictureInfoKHR-sType-sType) VUID-VkVideoEncodeAV1PictureInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_ENCODE_AV1_PICTURE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkVideoEncodeAV1PictureInfoKHR-predictionMode-parameter) VUID-VkVideoEncodeAV1PictureInfoKHR-predictionMode-parameter

 `predictionMode` **must** be a valid [VkVideoEncodeAV1PredictionModeKHR](VkVideoEncodeAV1PredictionModeKHR.html) value

* 
[](#VUID-VkVideoEncodeAV1PictureInfoKHR-rateControlGroup-parameter) VUID-VkVideoEncodeAV1PictureInfoKHR-rateControlGroup-parameter

 `rateControlGroup` **must** be a valid [VkVideoEncodeAV1RateControlGroupKHR](VkVideoEncodeAV1RateControlGroupKHR.html) value

* 
[](#VUID-VkVideoEncodeAV1PictureInfoKHR-pStdPictureInfo-parameter) VUID-VkVideoEncodeAV1PictureInfoKHR-pStdPictureInfo-parameter

 `pStdPictureInfo` **must** be a valid pointer to a valid `StdVideoEncodeAV1PictureInfo` value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoEncodeInfoKHR](VkVideoEncodeInfoKHR.html)

[VK_KHR_video_encode_av1](VK_KHR_video_encode_av1.html), `VkBool32`, [VkStructureType](VkStructureType.html), [VkVideoEncodeAV1PredictionModeKHR](VkVideoEncodeAV1PredictionModeKHR.html), [VkVideoEncodeAV1RateControlGroupKHR](VkVideoEncodeAV1RateControlGroupKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeAV1PictureInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
