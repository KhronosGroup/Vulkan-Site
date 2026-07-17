# VkDebugMarkerObjectTagInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDebugMarkerObjectTagInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDebugMarkerObjectTagInfoEXT - Specify parameters of a tag to attach to an object

The `VkDebugMarkerObjectTagInfoEXT` structure is defined as:

// Provided by VK_EXT_debug_marker
typedef struct VkDebugMarkerObjectTagInfoEXT {
    VkStructureType               sType;
    const void*                   pNext;
    VkDebugReportObjectTypeEXT    objectType;
    uint64_t                      object;
    uint64_t                      tagName;
    size_t                        tagSize;
    const void*                   pTag;
} VkDebugMarkerObjectTagInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`objectType` is a [VkDebugReportObjectTypeEXT](VkDebugReportObjectTypeEXT.html) specifying the
type of the object to be named.

* 
`object` is the object to be tagged.

* 
`tagName` is a numerical identifier of the tag.

* 
`tagSize` is the number of bytes of data to attach to the object.

* 
`pTag` is a pointer to an array of `tagSize` bytes containing
the data to be associated with the object.

The `tagName` parameter gives a name or identifier to the type of data
being tagged.
This can be used by debugging layers to easily filter for only data that can
be used by that implementation.

Valid Usage

* 
[](#VUID-VkDebugMarkerObjectTagInfoEXT-objectType-01493) VUID-VkDebugMarkerObjectTagInfoEXT-objectType-01493

`objectType` **must** not be
[VK_DEBUG_REPORT_OBJECT_TYPE_UNKNOWN_EXT](VkDebugReportObjectTypeEXT.html)

* 
[](#VUID-VkDebugMarkerObjectTagInfoEXT-object-01494) VUID-VkDebugMarkerObjectTagInfoEXT-object-01494

`object` **must** not be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkDebugMarkerObjectTagInfoEXT-object-01495) VUID-VkDebugMarkerObjectTagInfoEXT-object-01495

`object` **must** be a Vulkan object of the type associated with
`objectType` as defined in [VkDebugReportObjectTypeEXT and Vulkan Handle Relationship](../../../../spec/latest/chapters/debugging.html#debug-report-object-types)

Valid Usage (Implicit)

* 
[](#VUID-VkDebugMarkerObjectTagInfoEXT-sType-sType) VUID-VkDebugMarkerObjectTagInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEBUG_MARKER_OBJECT_TAG_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkDebugMarkerObjectTagInfoEXT-pNext-pNext) VUID-VkDebugMarkerObjectTagInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDebugMarkerObjectTagInfoEXT-objectType-parameter) VUID-VkDebugMarkerObjectTagInfoEXT-objectType-parameter

 `objectType` **must** be a valid [VkDebugReportObjectTypeEXT](VkDebugReportObjectTypeEXT.html) value

* 
[](#VUID-VkDebugMarkerObjectTagInfoEXT-pTag-parameter) VUID-VkDebugMarkerObjectTagInfoEXT-pTag-parameter

 `pTag` **must** be a valid pointer to an array of `tagSize` bytes

* 
[](#VUID-VkDebugMarkerObjectTagInfoEXT-tagSize-arraylength) VUID-VkDebugMarkerObjectTagInfoEXT-tagSize-arraylength

 `tagSize` **must** be greater than `0`

Host Synchronization

* 
Host access to `object` **must** be externally synchronized

[VK_EXT_debug_marker](VK_EXT_debug_marker.html), [VkDebugReportObjectTypeEXT](VkDebugReportObjectTypeEXT.html), [VkStructureType](VkStructureType.html), [vkDebugMarkerSetObjectTagEXT](vkDebugMarkerSetObjectTagEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#VkDebugMarkerObjectTagInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
