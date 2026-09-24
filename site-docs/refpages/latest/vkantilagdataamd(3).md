# VkAntiLagDataAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAntiLagDataAMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAntiLagDataAMD - Structure specifying the parameters for vkAntiLagUpdateAMD

The `VkAntiLagDataAMD` structure is defined as:

// Provided by VK_AMD_anti_lag
typedef struct VkAntiLagDataAMD {
    VkStructureType                        sType;
    const void*                            pNext;
    VkAntiLagModeAMD                       mode;
    uint32_t                               maxFPS;
    const VkAntiLagPresentationInfoAMD*    pPresentationInfo;
} VkAntiLagDataAMD;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`mode` is a [VkAntiLagModeAMD](VkAntiLagModeAMD.html) value specifying the anti-lag
status.

* 
`maxFPS` is the framerate limit, in frames per second, used by the
application.
This limit will be imposed if anti-lag is enabled.
If the application tries to render faster, the framerate will be reduced
to match this limit.
A value of 0 will disable the limit.

* 
`pPresentationInfo` is a pointer to a
[VkAntiLagPresentationInfoAMD](VkAntiLagPresentationInfoAMD.html) structure containing information
about the application stage.

This structure specifies anti-lag parameters.

Valid Usage (Implicit)

* 
[](#VUID-VkAntiLagDataAMD-sType-sType) VUID-VkAntiLagDataAMD-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ANTI_LAG_DATA_AMD](VkStructureType.html)

* 
[](#VUID-VkAntiLagDataAMD-mode-parameter) VUID-VkAntiLagDataAMD-mode-parameter

 `mode` **must** be a valid [VkAntiLagModeAMD](VkAntiLagModeAMD.html) value

* 
[](#VUID-VkAntiLagDataAMD-pPresentationInfo-parameter) VUID-VkAntiLagDataAMD-pPresentationInfo-parameter

 If `pPresentationInfo` is not `NULL`, `pPresentationInfo` **must** be a valid pointer to a valid [VkAntiLagPresentationInfoAMD](VkAntiLagPresentationInfoAMD.html) structure

[VK_AMD_anti_lag](VK_AMD_anti_lag.html), [VkAntiLagModeAMD](VkAntiLagModeAMD.html), [VkAntiLagPresentationInfoAMD](VkAntiLagPresentationInfoAMD.html), [VkStructureType](VkStructureType.html), [vkAntiLagUpdateAMD](vkAntiLagUpdateAMD.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkAntiLagDataAMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
