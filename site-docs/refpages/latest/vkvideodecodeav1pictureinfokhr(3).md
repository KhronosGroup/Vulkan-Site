# VkVideoDecodeAV1PictureInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoDecodeAV1PictureInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoDecodeAV1PictureInfoKHR - Structure specifies AV1 picture information when decoding a frame

The `VkVideoDecodeAV1PictureInfoKHR` structure is defined as:

// Provided by VK_KHR_video_decode_av1
typedef struct VkVideoDecodeAV1PictureInfoKHR {
    VkStructureType                        sType;
    const void*                            pNext;
    const StdVideoDecodeAV1PictureInfo*    pStdPictureInfo;
    int32_t                                referenceNameSlotIndices[VK_MAX_VIDEO_AV1_REFERENCES_PER_FRAME_KHR];
    uint32_t                               frameHeaderOffset;
    uint32_t                               tileCount;
    const uint32_t*                        pTileOffsets;
    const uint32_t*                        pTileSizes;
} VkVideoDecodeAV1PictureInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pStdPictureInfo` is a pointer to a
`StdVideoDecodeAV1PictureInfo` structure specifying
[AV1 picture information](../../../../spec/latest/chapters/videocoding.html#decode-av1-picture-info).

* 
`referenceNameSlotIndices` is an array of seven
([VK_MAX_VIDEO_AV1_REFERENCES_PER_FRAME_KHR](VK_MAX_VIDEO_AV1_REFERENCES_PER_FRAME_KHR.html), which is equal to the
Video Std definition `STD_VIDEO_AV1_REFS_PER_FRAME`) signed integer
values specifying the index of the [DPB slot](../../../../spec/latest/chapters/videocoding.html#dpb-slot) or a negative
integer value for each [AV1 reference name](../../../../spec/latest/chapters/videocoding.html#decode-av1-reference-names)
used for inter coding.
In particular, the DPB slot index for the AV1 reference name `frame`
is specified in `referenceNameSlotIndices`[`frame` -
`STD_VIDEO_AV1_REFERENCE_NAME_LAST_FRAME`].

* 
`frameHeaderOffset` is the byte offset of the AV1 frame header OBU,
as defined in section 5.9 of the [AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1),
within the video bitstream buffer range specified in
[VkVideoDecodeInfoKHR](VkVideoDecodeInfoKHR.html).

* 
`tileCount` is the number of elements in `pTileOffsets` and
`pTileSizes`.

* 
`pTileOffsets` is a pointer to an array of `tileCount` integers
specifying the byte offset of the tiles of the picture within the video
bitstream buffer range specified in [VkVideoDecodeInfoKHR](VkVideoDecodeInfoKHR.html).

* 
`pTileSizes` is a pointer to an array of `tileCount` integers
specifying the byte size of the tiles of the picture within the video
bitstream buffer range specified in [VkVideoDecodeInfoKHR](VkVideoDecodeInfoKHR.html).

This structure is specified in the `pNext` chain of the
[VkVideoDecodeInfoKHR](VkVideoDecodeInfoKHR.html) structure passed to [vkCmdDecodeVideoKHR](vkCmdDecodeVideoKHR.html) to
specify the codec-specific picture information for an [AV1 decode operation](../../../../spec/latest/chapters/videocoding.html#decode-av1).

Decode Output Picture Information

When this structure is specified in the `pNext` chain of the
[VkVideoDecodeInfoKHR](VkVideoDecodeInfoKHR.html) structure passed to [vkCmdDecodeVideoKHR](vkCmdDecodeVideoKHR.html),
the information related to the [decode output picture](../../../../spec/latest/chapters/videocoding.html#decode-output-picture-info) is defined as follows:

* 
The image subregion used is determined according to the
[AV1 Decode Picture Data Access](../../../../spec/latest/chapters/videocoding.html#decode-av1-picture-data-access)
section.

* 
The decode output picture is associated with the
[AV1 picture information](../../../../spec/latest/chapters/videocoding.html#decode-av1-picture-info) provided in
`pStdPictureInfo`.

Std Picture Information

The members of the `StdVideoDecodeAV1PictureInfo` structure pointed to by
`pStdPictureInfo` are interpreted as follows:

* 
`flags.reserved`, `reserved1`, and `reserved2` are used only
for padding purposes and are otherwise ignored;

* 
 `flags.apply_grain` indicates that film
grain is enabled for the decoded picture, as defined in section 6.8.20
of the [AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1);

* 
`OrderHint`, `OrderHints`, and `expectedFrameId` are
interpreted as defined in section 6.8.2 of the [AV1    Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1);

* 
the `StdVideoAV1TileInfo` structure pointed to by `pTileInfo` is
interpreted as follows:

`flags.reserved` and `reserved1` are used only for padding
purposes and are otherwise ignored;

* 
`pMiColStarts` is a pointer to an array of `TileCols` number of
unsigned integers that corresponds to `MiColStarts` defined in
section 6.8.14 of the [AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1);

* 
`pMiRowStarts` is a pointer to an array of `TileRows` number of
unsigned integers that corresponds to `MiRowStarts` defined in
section 6.8.14 of the [AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1);

|  | Historically some applications incorrectly specified the values in
| --- | --- |
`pMiColStarts` and `pMiRowStarts` in terms of superblocks instead of
mode info blocks, therefore it is recommended for implementations to ignore
the values specified in `pMiColStarts` and `pMiRowStarts`.
Instead, the values should be calculated based on
`flags.uniform_tile_spacing_flag`, `pWidthInSbsMinus1`,
`pHeightInSbsMinus1`, the [sequence header](../../../../spec/latest/chapters/videocoding.html#decode-av1-sequence-header)
parameter `flags.use_128x128_superblock`, and the coded extent of the
decoded picture. |

* 
`pWidthInSbsMinus1` is a pointer to an array of `TileCols` number
of unsigned integers that corresponds to `width_in_sbs_minus_1`
defined in section 6.8.14 of the [AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1);

* 
`pHeightInSbsMinus1` is a pointer to an array of `TileRows`
number of unsigned integers that corresponds to
`height_in_sbs_minus_1` defined in section 6.8.14 of the
[AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1);

* 
all other members of `StdVideoAV1TileInfo` are interpreted as
defined in section 6.8.14 of the [AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1);

the `StdVideoAV1Quantization` structure pointed to by
`pQuantization` is interpreted as follows:

* 
`flags.reserved` is used only for padding purposes and is otherwise
ignored;

* 
all other members of `StdVideoAV1Quantization` are interpreted as
defined in section 6.8.11 of the [AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1);

if `flags.segmentation_enabled` is set, then the
`StdVideoAV1Segmentation` structure pointed to by `pSegmentation`
is interpreted as follows:

* 
the elements of `FeatureEnabled` are bitmasks where bit index
j of element i corresponds to `FeatureEnabled[i][j]` as
defined in section 5.9.14 of the [AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1);

* 
`FeatureData` is interpreted as defined in section 5.9.14 of the
[AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1);

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

|  | If the syntax elements corresponding to `loop_filter_ref_deltas` and
| --- | --- |
`loop_filter_mode_deltas` are not present or otherwise defined according
to section 5.9.11 of the [AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1), the application
should specify the previous values, as defined in section 6.8.10 of the
[AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1). |

if `flags.enable_cdef` is set in the
[active sequence header](../../../../spec/latest/chapters/videocoding.html#decode-av1-active-sequence-header), then the
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
the [AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1).

* 
all other members of `StdVideoAV1LoopRestoration` are defined as in
section 6.10.15 of the [AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1);

the members of the `StdVideoAV1GlobalMotion` structure pointed to by
`pGlobalMotion` are interpreted as defined in section 7.10 of the
[AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1);

if `flags.film_grain_params_present` is set in the
[active sequence header](../../../../spec/latest/chapters/videocoding.html#decode-av1-active-sequence-header), then the
`StdVideoAV1FilmGrain` structure pointed to by `pFilmGrain` is
interpreted as follows:

* 
`flags.reserved` is used only for padding purposes and is otherwise
ignored;

* 
all other members of `StdVideoAV1FilmGrain` are interpreted as
defined in section 6.8.20 of the [AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1);

all other members are interpreted as defined in section 6.8 of the
[AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1).

When [film grain is enabled](../../../../spec/latest/chapters/videocoding.html#decode-av1-film-grain) for the decoded frame,
the `flags.update_grain` and `film_grain_params_ref_idx` values
specified in `StdVideoAV1FilmGrain` are ignored by AV1 decode operations
and the `load_grain_params` function, as defined in section 6.8.20 of the
[AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1), is not executed.
Instead, the application is responsible for specifying the effective film
grain parameters for the frame in `StdVideoAV1FilmGrain`.

When [film grain is enabled](../../../../spec/latest/chapters/videocoding.html#decode-av1-film-grain) for the decoded frame,
the application is required to specify a different decode output picture
resource in [VkVideoDecodeInfoKHR](VkVideoDecodeInfoKHR.html)::`dstPictureResource` compared to
the reconstructed picture specified in
[VkVideoDecodeInfoKHR](VkVideoDecodeInfoKHR.html)::`pSetupReferenceSlot->pPictureResource` even
if the implementation does not report support for
[VK_VIDEO_DECODE_CAPABILITY_DPB_AND_OUTPUT_DISTINCT_BIT_KHR](VkVideoDecodeCapabilityFlagBitsKHR.html) in
[VkVideoDecodeCapabilitiesKHR](VkVideoDecodeCapabilitiesKHR.html)::`flags` for the video decode
profile.

Reference picture setup is controlled by the value of
`StdVideoDecodeAV1PictureInfo`::`refresh_frame_flags`.
If it is not zero and a [reconstructed picture](../../../../spec/latest/chapters/videocoding.html#decode-reconstructed-picture-info) is specified, then the latter is used as the target of picture
reconstruction to [activate](../../../../spec/latest/chapters/videocoding.html#dpb-slot-states) the [DPB slot](../../../../spec/latest/chapters/videocoding.html#dpb-slot)
specified in `pDecodeInfo->pSetupReferenceSlot→slotIndex`.
If `StdVideoDecodeAV1PictureInfo`::`refresh_frame_flags` is zero, but
a [reconstructed picture](../../../../spec/latest/chapters/videocoding.html#decode-reconstructed-picture-info) is specified,
then the corresponding picture reference associated with the [DPB slot](../../../../spec/latest/chapters/videocoding.html#dpb-slot) is invalidated, as described in the [DPB Slot States](../../../../spec/latest/chapters/videocoding.html#dpb-slot-states) section.

Active Parameter Sets

The *active sequence header* is the [AV1 sequence header](../../../../spec/latest/chapters/videocoding.html#decode-av1-sequence-header) stored in the bound video session parameters object
, unless the bound video session was created with
[VK_VIDEO_SESSION_CREATE_INLINE_SESSION_PARAMETERS_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html) and the
active sequence header is specified
[inline](../../../../spec/latest/chapters/videocoding.html#decode-av1-inline-parameter-sets).
.

Valid Usage (Implicit)

* 
[](#VUID-VkVideoDecodeAV1PictureInfoKHR-sType-sType) VUID-VkVideoDecodeAV1PictureInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_DECODE_AV1_PICTURE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkVideoDecodeAV1PictureInfoKHR-pStdPictureInfo-parameter) VUID-VkVideoDecodeAV1PictureInfoKHR-pStdPictureInfo-parameter

 `pStdPictureInfo` **must** be a valid pointer to a valid `StdVideoDecodeAV1PictureInfo` value

* 
[](#VUID-VkVideoDecodeAV1PictureInfoKHR-pTileOffsets-parameter) VUID-VkVideoDecodeAV1PictureInfoKHR-pTileOffsets-parameter

 `pTileOffsets` **must** be a valid pointer to an array of `tileCount` `uint32_t` values

* 
[](#VUID-VkVideoDecodeAV1PictureInfoKHR-pTileSizes-parameter) VUID-VkVideoDecodeAV1PictureInfoKHR-pTileSizes-parameter

 `pTileSizes` **must** be a valid pointer to an array of `tileCount` `uint32_t` values

* 
[](#VUID-VkVideoDecodeAV1PictureInfoKHR-tileCount-arraylength) VUID-VkVideoDecodeAV1PictureInfoKHR-tileCount-arraylength

 `tileCount` **must** be greater than `0`

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoDecodeInfoKHR](VkVideoDecodeInfoKHR.html)

[VK_KHR_video_decode_av1](VK_KHR_video_decode_av1.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoDecodeAV1PictureInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
