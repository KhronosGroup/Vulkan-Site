# VK_QCOM_elapsed_timer_query(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_QCOM_elapsed_timer_query.html

## Table of Contents

- [Name](#_name)
- [VK_QCOM_elapsed_timer_query](#VK_QCOM_elapsed_timer_query)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_QCOM_elapsed_timer_query - device extension

**Name String**

`VK_QCOM_elapsed_timer_query`

**Extension Type**

Device extension

**Registered Extension Number**

174

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Matthew Netsch [mnetsch](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_QCOM_elapsed_timer_query] @mnetsch%0A*Here describe the issue or question you have about the VK_QCOM_elapsed_timer_query extension*)

**Extension Proposal**

[VK_QCOM_elapsed_timer_query](../../../../features/latest/features/proposals/VK_QCOM_elapsed_timer_query.html)

**Last Modified Date**

2026-05-08

**Interactions and External Dependencies**

* 
Interacts with `apiExt:VK_KHR_calibrated_timestamps`

* 
Interacts with `apiExt:VK_KHR_maintenance7`

* 
Interacts with `apiExt:VK_EXT_transform_feedback`

**Contributors**

* 
Matthew Netsch, Qualcomm Technologies, Inc

* 
Jacob Garcia, Qualcomm Technologies, Inc

* 
Patrick Boyle, Qualcomm Technologies, Inc

This extension adds a new query type to write out the elapsed time between a
set of commands, providing similar functionality to `GL_ARB_timer_query`.

There is no existing solution on tilers for measuring commands inside render
pass instances, as comparing query timestamps will not give valid results.

This extension, solves the issue by adding a new query type that can be used
to measure time between a begin and end query and works inside render pass
instances.
The implementation is responsible for accumulating the correct elapsed time
for the commands across all tiles.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceElapsedTimerQueryFeaturesQCOM](VkPhysicalDeviceElapsedTimerQueryFeaturesQCOM.html)

* 
`VK_QCOM_ELAPSED_TIMER_QUERY_EXTENSION_NAME`

* 
`VK_QCOM_ELAPSED_TIMER_QUERY_SPEC_VERSION`

* 
Extending [VkQueryType](VkQueryType.html):

[VK_QUERY_TYPE_TIME_ELAPSED_QCOM](VkQueryType.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ELAPSED_TIMER_QUERY_FEATURES_QCOM](VkStructureType.html)

(1) How to handle overflows?

* 
Resolved: While [VK_QUERY_RESULT_WITH_STATUS_BIT_KHR](VkQueryResultFlagBits.html) could have
been used to indicate an overflow, it is difficult for an implementation
to detect this.
The accumulation occurs on the device, and overflow detection requires
calculations prior to accumulation which may not be supported by the
device.
Instead, if the application rejects outliers as part of the profiling
process, this issue should be exceedingly rare.
If an application is sensitive to this in production, it will need to
implement some mechanism to reject bad results.
For example, measuring the timestamp before and after the render pass
could give a clue about an overflow.

* 
Revision 1, 2026-05-08 (Matthew Netsch)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_QCOM_elapsed_timer_query).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
