# vkGetDataGraphPipelineSessionBindPointRequirementsARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetDataGraphPipelineSessionBindPointRequirementsARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetDataGraphPipelineSessionBindPointRequirementsARM - Get the bind point requirements of a data graph pipeline session

To determine the bind point requirements for a data graph pipeline session,
call:

// Provided by VK_ARM_data_graph
VkResult vkGetDataGraphPipelineSessionBindPointRequirementsARM(
    VkDevice                                    device,
    const VkDataGraphPipelineSessionBindPointRequirementsInfoARM* pInfo,
    uint32_t*                                   pBindPointRequirementCount,
    VkDataGraphPipelineSessionBindPointRequirementARM* pBindPointRequirements);

* 
`device` is the logical device that owns the data graph pipeline
session.

* 
`pInfo` is a pointer to a
[VkDataGraphPipelineSessionBindPointRequirementsInfoARM](VkDataGraphPipelineSessionBindPointRequirementsInfoARM.html) structure
containing parameters for the bind point requirements query.

* 
`pBindPointRequirementCount` is a pointer to an integer related to
the number of bind point available or queried, as described below.

* 
`pBindPointRequirements` is either `NULL` or a pointer to an array
of [VkDataGraphPipelineSessionBindPointRequirementARM](VkDataGraphPipelineSessionBindPointRequirementARM.html) structures.

If `pBindPointRequirements` is `NULL`, then the number of bind points
associated with the data graph pipeline session is returned in
`pBindPointRequirementCount`.
Otherwise, `pBindPointRequirementCount` **must** point to a variable set by
the user to the number of elements in the `pBindPointRequirements`
array, and on return the variable is overwritten with the number of
structures actually written to `pBindPointRequirements`.
If `pBindPointRequirementCount` is less than the number of bind points
associated with the data graph pipeline session, at most
`pBindPointRequirementCount` structures will be written, and
[VK_INCOMPLETE](VkResult.html) will be returned instead of [VK_SUCCESS](VkResult.html), to
indicate that not all the required bind points were returned.

Valid Usage

* 
[](#VUID-vkGetDataGraphPipelineSessionBindPointRequirementsARM-session-09783) VUID-vkGetDataGraphPipelineSessionBindPointRequirementsARM-session-09783

The `session` member of `pInfo` **must** have been created with
`device`

Valid Usage (Implicit)

* 
[](#VUID-vkGetDataGraphPipelineSessionBindPointRequirementsARM-device-parameter) VUID-vkGetDataGraphPipelineSessionBindPointRequirementsARM-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetDataGraphPipelineSessionBindPointRequirementsARM-pInfo-parameter) VUID-vkGetDataGraphPipelineSessionBindPointRequirementsARM-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkDataGraphPipelineSessionBindPointRequirementsInfoARM](VkDataGraphPipelineSessionBindPointRequirementsInfoARM.html) structure

* 
[](#VUID-vkGetDataGraphPipelineSessionBindPointRequirementsARM-pBindPointRequirementCount-parameter) VUID-vkGetDataGraphPipelineSessionBindPointRequirementsARM-pBindPointRequirementCount-parameter

 `pBindPointRequirementCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetDataGraphPipelineSessionBindPointRequirementsARM-pBindPointRequirements-parameter) VUID-vkGetDataGraphPipelineSessionBindPointRequirementsARM-pBindPointRequirements-parameter

 If the value referenced by `pBindPointRequirementCount` is not `0`, and `pBindPointRequirements` is not `NULL`, `pBindPointRequirements` **must** be a valid pointer to an array of `pBindPointRequirementCount` [VkDataGraphPipelineSessionBindPointRequirementARM](VkDataGraphPipelineSessionBindPointRequirementARM.html) structures

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](VkResult.html)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_ARM_data_graph](VK_ARM_data_graph.html), [VkDataGraphPipelineSessionBindPointRequirementARM](VkDataGraphPipelineSessionBindPointRequirementARM.html), [VkDataGraphPipelineSessionBindPointRequirementsInfoARM](VkDataGraphPipelineSessionBindPointRequirementsInfoARM.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#vkGetDataGraphPipelineSessionBindPointRequirementsARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
