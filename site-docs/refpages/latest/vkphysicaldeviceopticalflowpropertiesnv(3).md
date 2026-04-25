# VkPhysicalDeviceOpticalFlowPropertiesNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceOpticalFlowPropertiesNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceOpticalFlowPropertiesNV - Structure describing properties supported by VK_NV_optical_flow

The `VkPhysicalDeviceOpticalFlowPropertiesNV` structure is defined as:

// Provided by VK_NV_optical_flow
typedef struct VkPhysicalDeviceOpticalFlowPropertiesNV {
    VkStructureType                 sType;
    void*                           pNext;
    VkOpticalFlowGridSizeFlagsNV    supportedOutputGridSizes;
    VkOpticalFlowGridSizeFlagsNV    supportedHintGridSizes;
    VkBool32                        hintSupported;
    VkBool32                        costSupported;
    VkBool32                        bidirectionalFlowSupported;
    VkBool32                        globalFlowSupported;
    uint32_t                        minWidth;
    uint32_t                        minHeight;
    uint32_t                        maxWidth;
    uint32_t                        maxHeight;
    uint32_t                        maxNumRegionsOfInterest;
} VkPhysicalDeviceOpticalFlowPropertiesNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `supportedOutputGridSizes` are
the supported [VkOpticalFlowGridSizeFlagsNV](VkOpticalFlowGridSizeFlagsNV.html) which can be specified
in `VkOpticalFlowSessionCreateInfoNV`::`outputGridSize`.

* 
 `supportedHintGridSizes` are the
supported [VkOpticalFlowGridSizeFlagsNV](VkOpticalFlowGridSizeFlagsNV.html) which can be specified in
`VkOpticalFlowSessionCreateInfoNV`::`hintGridSize`.

* 
 `hintSupported` is a boolean describing
whether using hint flow vector map is supported in an optical flow
session.

* 
 `costSupported` is a boolean describing
whether cost map generation is supported in an optical flow session.

* 
 `bidirectionalFlowSupported`
is a boolean describing whether bi-directional flow generation is
supported in an optical flow session.

* 
 `globalFlowSupported` is a boolean
describing whether global flow vector map generation is supported in an
optical flow session.

* 
 `minWidth` is the minimum width in pixels for
images used in an optical flow session.

* 
 `minHeight` is the minimum height in pixels for
images used in an optical flow session.

* 
 `maxWidth` is the maximum width in pixels for
images used in an optical flow session.

* 
 `maxHeight` is the maximum height in pixels for
images used in an optical flow session.

* 
 `maxNumRegionsOfInterest` is the
maximum number of regions of interest which can be used in an optical
flow session.
If this `maxNumRegionsOfInterest` is 0, regions of interest are not
supported in an optical flow session.

If the `VkPhysicalDeviceOpticalFlowPropertiesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceOpticalFlowPropertiesNV-sType-sType) VUID-VkPhysicalDeviceOpticalFlowPropertiesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_OPTICAL_FLOW_PROPERTIES_NV](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_NV_optical_flow](VK_NV_optical_flow.html), `VkBool32`, [VkOpticalFlowGridSizeFlagsNV](VkOpticalFlowGridSizeFlagsNV.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceOpticalFlowPropertiesNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
