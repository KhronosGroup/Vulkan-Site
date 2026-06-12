# PFN_vkDebugReportCallbackEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/PFN_vkDebugReportCallbackEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

PFN_vkDebugReportCallbackEXT - Application-defined debug report callback function

The prototype for the
[VkDebugReportCallbackCreateInfoEXT](VkDebugReportCallbackCreateInfoEXT.html)::`pfnCallback` function
implemented by the application is:

// Provided by VK_EXT_debug_report
typedef VkBool32 (*PFN_vkDebugReportCallbackEXT)(
    VkDebugReportFlagsEXT                       flags,
    VkDebugReportObjectTypeEXT                  objectType,
    uint64_t                                    object,
    size_t                                      location,
    int32_t                                     messageCode,
    const char*                                 pLayerPrefix,
    const char*                                 pMessage,
    void*                                       pUserData);

* 
`flags` specifies the [VkDebugReportFlagBitsEXT](VkDebugReportFlagBitsEXT.html) that triggered
this callback.

* 
`objectType` is a [VkDebugReportObjectTypeEXT](VkDebugReportObjectTypeEXT.html) value specifying
the type of object being used or created at the time the event was
triggered.

* 
`object` is the object where the issue was detected.
If `objectType` is [VK_DEBUG_REPORT_OBJECT_TYPE_UNKNOWN_EXT](VkDebugReportObjectTypeEXT.html),
`object` is **undefined**.

* 
`location` is a component (layer, driver, loader) defined value
specifying the *location* of the trigger.
This is an **optional** value.

* 
`messageCode` is a layer-defined value indicating what test
triggered this callback.

* 
`pLayerPrefix` is a null-terminated UTF-8 string that is an
abbreviation of the name of the component making the callback.
`pLayerPrefix` is only valid for the duration of the callback.

* 
`pMessage` is a null-terminated UTF-8 string detailing the trigger
conditions.
`pMessage` is only valid for the duration of the callback.

* 
`pUserData` is the application-defined user data pointer, equal to
the value of [VkDebugReportCallbackCreateInfoEXT](VkDebugReportCallbackCreateInfoEXT.html)::`pUserData`
specified when the [VkDebugReportCallbackEXT](VkDebugReportCallbackEXT.html) object was created.

The callback **must** not call `vkDestroyDebugReportCallbackEXT`.

The callback returns a `VkBool32`, which is interpreted in a
layer-specified manner.
The application **should** always return [VK_FALSE](VK_FALSE.html).
The [VK_TRUE](VK_TRUE.html) value is reserved for use in layer development.

`object` **must** be a Vulkan object or [VK_NULL_HANDLE](VK_NULL_HANDLE.html).
If `objectType` is not [VK_DEBUG_REPORT_OBJECT_TYPE_UNKNOWN_EXT](VkDebugReportObjectTypeEXT.html) and
`object` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `object` **must** be a Vulkan
object of the corresponding type associated with `objectType` as defined
in [VkDebugReportObjectTypeEXT and Vulkan Handle Relationship](../../../../spec/latest/chapters/debugging.html#debug-report-object-types).

[VK_EXT_debug_report](VK_EXT_debug_report.html), `VkBool32`, [VkDebugReportCallbackCreateInfoEXT](VkDebugReportCallbackCreateInfoEXT.html), [VkDebugReportFlagsEXT](VkDebugReportFlagsEXT.html), [VkDebugReportObjectTypeEXT](VkDebugReportObjectTypeEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#PFN_vkDebugReportCallbackEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
