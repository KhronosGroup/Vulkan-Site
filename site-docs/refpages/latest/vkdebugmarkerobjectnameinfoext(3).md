# VkDebugMarkerObjectNameInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDebugMarkerObjectNameInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDebugMarkerObjectNameInfoEXT - Specify parameters of a name to give to an object

The `VkDebugMarkerObjectNameInfoEXT` structure is defined as:

// Provided by VK_EXT_debug_marker
typedef struct VkDebugMarkerObjectNameInfoEXT {
    VkStructureType               sType;
    const void*                   pNext;
    VkDebugReportObjectTypeEXT    objectType;
    uint64_t                      object;
    const char*                   pObjectName;
} VkDebugMarkerObjectNameInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`objectType` is a [VkDebugReportObjectTypeEXT](VkDebugReportObjectTypeEXT.html) specifying the
type of the object to be named.

* 
`object` is the object to be named.

* 
`pObjectName` is a null-terminated UTF-8 string specifying the name
to apply to `object`.

Applications **may** change the name associated with an object simply by
calling `vkDebugMarkerSetObjectNameEXT` again with a new string.
To remove a previously set name, `pObjectName` **should** be an empty
string.

Valid Usage

* 
[](#VUID-VkDebugMarkerObjectNameInfoEXT-objectType-01490) VUID-VkDebugMarkerObjectNameInfoEXT-objectType-01490

`objectType` **must** not be
[VK_DEBUG_REPORT_OBJECT_TYPE_UNKNOWN_EXT](VkDebugReportObjectTypeEXT.html)

* 
[](#VUID-VkDebugMarkerObjectNameInfoEXT-object-01491) VUID-VkDebugMarkerObjectNameInfoEXT-object-01491

`object` **must** not be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkDebugMarkerObjectNameInfoEXT-object-01492) VUID-VkDebugMarkerObjectNameInfoEXT-object-01492

`object` **must** be a Vulkan object of the type associated with
`objectType` as defined in [VkDebugReportObjectTypeEXT and Vulkan Handle Relationship](../../../../spec/latest/chapters/debugging.html#debug-report-object-types)

Valid Usage (Implicit)

* 
[](#VUID-VkDebugMarkerObjectNameInfoEXT-sType-sType) VUID-VkDebugMarkerObjectNameInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEBUG_MARKER_OBJECT_NAME_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkDebugMarkerObjectNameInfoEXT-pNext-pNext) VUID-VkDebugMarkerObjectNameInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDebugMarkerObjectNameInfoEXT-objectType-parameter) VUID-VkDebugMarkerObjectNameInfoEXT-objectType-parameter

 `objectType` **must** be a valid [VkDebugReportObjectTypeEXT](VkDebugReportObjectTypeEXT.html) value

* 
[](#VUID-VkDebugMarkerObjectNameInfoEXT-pObjectName-parameter) VUID-VkDebugMarkerObjectNameInfoEXT-pObjectName-parameter

 `pObjectName` **must** be a null-terminated UTF-8 string

Host Synchronization

* 
Host access to `object` **must** be externally synchronized

[VK_EXT_debug_marker](VK_EXT_debug_marker.html), [VkDebugReportObjectTypeEXT](VkDebugReportObjectTypeEXT.html), [VkStructureType](VkStructureType.html), [vkDebugMarkerSetObjectNameEXT](vkDebugMarkerSetObjectNameEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#VkDebugMarkerObjectNameInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
