# VK_KHR_device_fault

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_KHR_device_fault.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [2.1. Allow vkGetDeviceFaultInfoEXT/KHR() to be called ad-hoc (Polling)](#_allow_vkgetdevicefaultinfoextkhr_to_be_called_ad_hoc_polling)
- [2.1._Allow_vkGetDeviceFaultInfoEXT/KHR()_to_be_called_ad-hoc_(Polling)](#_allow_vkgetdevicefaultinfoextkhr_to_be_called_ad_hoc_polling)
- [2.2. Introduce a new error code](#_introduce_a_new_error_code)
- [2.2._Introduce_a_new_error_code](#_introduce_a_new_error_code)
- [2.3. Introduce an extended reporting mechanism: Polling With Timeout](#_introduce_an_extended_reporting_mechanism_polling_with_timeout)
- [2.3._Introduce_an_extended_reporting_mechanism:_Polling_With_Timeout](#_introduce_an_extended_reporting_mechanism_polling_with_timeout)
- [2.4. Introduce an extended reporting mechanism: Callbacks](#_introduce_an_extended_reporting_mechanism_callbacks)
- [2.4._Introduce_an_extended_reporting_mechanism:_Callbacks](#_introduce_an_extended_reporting_mechanism_callbacks)
- [3. Proposal](#_proposal)
- [3.1. API Features](#_api_features)
- [3.1._API_Features](#_api_features)
- [3.2. Querying for Fault Information](#_querying_for_fault_information)
- [3.2._Querying_for_Fault_Information](#_querying_for_fault_information)
- [3.2.1. Return values](#_return_values)
- [3.2.1._Return_values](#_return_values)
- [3.3. Interpreting GPU Virtual Addresses](#_interpreting_gpu_virtual_addresses)
- [3.3._Interpreting_GPU_Virtual_Addresses](#_interpreting_gpu_virtual_addresses)
- [3.4. Retrieving the Vendor Binaries and other Fault Debug information](#_retrieving_the_vendor_binaries_and_other_fault_debug_information)
- [3.4._Retrieving_the_Vendor_Binaries_and_other_Fault_Debug_information](#_retrieving_the_vendor_binaries_and_other_fault_debug_information)
- [3.4.1. Return values](#_return_values_2)
- [3.4.1._Return_values](#_return_values_2)
- [3.5. VK_KHR_device_fault Feature Flags](#_vk_khr_device_fault_feature_flags)
- [3.5._VK_KHR_device_fault_Feature_Flags](#_vk_khr_device_fault_feature_flags)
- [3.6. Limits](#_limits)
- [4. Examples](#_examples)
- [4.1. Enabling Extension](#_enabling_extension)
- [4.1._Enabling_Extension](#_enabling_extension)
- [4.2. Polling for Faults](#_polling_for_faults)
- [4.2._Polling_for_Faults](#_polling_for_faults)
- [4.3. Blocking to wait for faults](#_blocking_to_wait_for_faults)
- [4.3._Blocking_to_wait_for_faults](#_blocking_to_wait_for_faults)
- [5. Issues](#_issues)
- [5.1. Should the reporting mechanism be based on polling, notifications, or both?](#_should_the_reporting_mechanism_be_based_on_polling_notifications_or_both)
- [5.1._Should_the_reporting_mechanism_be_based_on_polling,_notifications,_or_both?](#_should_the_reporting_mechanism_be_based_on_polling_notifications_or_both)
- [5.2. What should happen if there is a mismatch between queried infoCount and available infoCount?](#_what_should_happen_if_there_is_a_mismatch_between_queried_infocount_and_available_infocount)
- [5.2._What_should_happen_if_there_is_a_mismatch_between_queried_infoCount_and_available_infoCount?](#_what_should_happen_if_there_is_a_mismatch_between_queried_infocount_and_available_infocount)
- [5.3. What thread should the callback be called from?](#_what_thread_should_the_callback_be_called_from)
- [5.3._What_thread_should_the_callback_be_called_from?](#_what_thread_should_the_callback_be_called_from)
- [5.4. Can we reuse existing extensions and mechanisms more directly?](#_can_we_reuse_existing_extensions_and_mechanisms_more_directly)
- [5.4._Can_we_reuse_existing_extensions_and_mechanisms_more_directly?](#_can_we_reuse_existing_extensions_and_mechanisms_more_directly)
- [5.5. Blocking Queries](#_blocking_queries)
- [5.5._Blocking_Queries](#_blocking_queries)
- [5.6. Callbacks](#_callbacks)
- [5.7. Behavior of parallel calls to vkGetDeviceFaultReportsKHR()](#_behavior_of_parallel_calls_to_vkgetdevicefaultreportskhr)
- [5.7._Behavior_of_parallel_calls_to_vkGetDeviceFaultReportsKHR()](#_behavior_of_parallel_calls_to_vkgetdevicefaultreportskhr)
- [5.8. Fault Log Ring Limits](#_fault_log_ring_limits)
- [5.8._Fault_Log_Ring_Limits](#_fault_log_ring_limits)
- [5.9. Do we need a properties struct to indicate the maximum number of VkDeviceFaultAddressInfoKHR and VkDeviceFaultVendorInfoKHR structures?](#_do_we_need_a_properties_struct_to_indicate_the_maximum_number_of_vkdevicefaultaddressinfokhr_and_vkdevicefaultvendorinfokhr_structures)
- [5.9._Do_we_need_a_properties_struct_to_indicate_the_maximum_number_of_VkDeviceFaultAddressInfoKHR_and_VkDeviceFaultVendorInfoKHR_structures?](#_do_we_need_a_properties_struct_to_indicate_the_maximum_number_of_vkdevicefaultaddressinfokhr_and_vkdevicefaultvendorinfokhr_structures)
- [5.10. Do we need a way to communicate overflow on VkDeviceFaultAddressInfoKHR and VkDeviceFaultVendorInfoKHR ring buffers?](#_do_we_need_a_way_to_communicate_overflow_on_vkdevicefaultaddressinfokhr_and_vkdevicefaultvendorinfokhr_ring_buffers)
- [5.10._Do_we_need_a_way_to_communicate_overflow_on_VkDeviceFaultAddressInfoKHR_and_VkDeviceFaultVendorInfoKHR_ring_buffers?](#_do_we_need_a_way_to_communicate_overflow_on_vkdevicefaultaddressinfokhr_and_vkdevicefaultvendorinfokhr_ring_buffers)
- [5.11. Handling of vendorBinary for non-deviceLost queries](#_handling_of_vendorbinary_for_non_devicelost_queries)
- [5.11._Handling_of_vendorBinary_for_non-deviceLost_queries](#_handling_of_vendorbinary_for_non_devicelost_queries)
- [5.12. Should we update the return code for incomplete vendor binaries?](#_should_we_update_the_return_code_for_incomplete_vendor_binaries)
- [5.12._Should_we_update_the_return_code_for_incomplete_vendor_binaries?](#_should_we_update_the_return_code_for_incomplete_vendor_binaries)
- [6. Further Functionality](#_further_functionality)
- [6._Further_Functionality](#_further_functionality)
- [7. Revisions](#_revisions)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)

[2.1. Allow vkGetDeviceFaultInfoEXT/KHR() to be called ad-hoc (Polling)](#_allow_vkgetdevicefaultinfoextkhr_to_be_called_ad_hoc_polling)
[2.2. Introduce a new error code](#_introduce_a_new_error_code)
[2.3. Introduce an extended reporting mechanism: Polling With Timeout](#_introduce_an_extended_reporting_mechanism_polling_with_timeout)
[2.4. Introduce an extended reporting mechanism: Callbacks](#_introduce_an_extended_reporting_mechanism_callbacks)

[3. Proposal](#_proposal)

[3.1. API Features](#_api_features)
[3.2. Querying for Fault Information](#_querying_for_fault_information)
[3.3. Interpreting GPU Virtual Addresses](#_interpreting_gpu_virtual_addresses)
[3.4. Retrieving the Vendor Binaries and other Fault Debug information](#_retrieving_the_vendor_binaries_and_other_fault_debug_information)
[3.5. VK_KHR_device_fault Feature Flags](#_vk_khr_device_fault_feature_flags)
[3.6. Limits](#_limits)

[4. Examples](#_examples)

[4.1. Enabling Extension](#_enabling_extension)
[4.2. Polling for Faults](#_polling_for_faults)
[4.3. Blocking to wait for faults](#_blocking_to_wait_for_faults)

[5. Issues](#_issues)

[5.1. Should the reporting mechanism be based on polling, notifications, or both?](#_should_the_reporting_mechanism_be_based_on_polling_notifications_or_both)
[5.2. What should happen if there is a mismatch between queried infoCount and available infoCount?](#_what_should_happen_if_there_is_a_mismatch_between_queried_infocount_and_available_infocount)
[5.3. What thread should the callback be called from?](#_what_thread_should_the_callback_be_called_from)
[5.4. Can we reuse existing extensions and mechanisms more directly?](#_can_we_reuse_existing_extensions_and_mechanisms_more_directly)
[5.5. Blocking Queries](#_blocking_queries)
[5.6. Callbacks](#_callbacks)
[5.7. Behavior of parallel calls to vkGetDeviceFaultReportsKHR()](#_behavior_of_parallel_calls_to_vkgetdevicefaultreportskhr)
[5.8. Fault Log Ring Limits](#_fault_log_ring_limits)
[5.9. Do we need a properties struct to indicate the maximum number of VkDeviceFaultAddressInfoKHR and VkDeviceFaultVendorInfoKHR structures?](#_do_we_need_a_properties_struct_to_indicate_the_maximum_number_of_vkdevicefaultaddressinfokhr_and_vkdevicefaultvendorinfokhr_structures)
[5.10. Do we need a way to communicate overflow on VkDeviceFaultAddressInfoKHR and VkDeviceFaultVendorInfoKHR ring buffers?](#_do_we_need_a_way_to_communicate_overflow_on_vkdevicefaultaddressinfokhr_and_vkdevicefaultvendorinfokhr_ring_buffers)
[5.11. Handling of vendorBinary for non-deviceLost queries](#_handling_of_vendorbinary_for_non_devicelost_queries)
[5.12. Should we update the return code for incomplete vendor binaries?](#_should_we_update_the_return_code_for_incomplete_vendor_binaries)

[6. Further Functionality](#_further_functionality)
[7. Revisions](#_revisions)

This document outlines functionality to allow applications to query for
diagnostic information about device faults following a VK_ERROR_DEVICE_LOST.
This mirrors functionality first exposed via VK_EXT_device_fault.

It also extends this functionality to allow drivers to report faults which may
normally be handled internally and not reported as device lost errors.

Additionally, it allows for reporting faults which are provoked asynchronously by a
submitted command buffer, but were not triggered until after the queue submit
had returned.

A number of issues, including invalid application behavior, driver bugs,
hardware bugs, and physical failures may cause the device to fault.
When this happens, submitted work may not run to completion in which case
any outputs will have undefined contents.

Such faults may or may not be reported as device lost errors.
Specifically, an implementation can choose to not report device lost if
it expects that work submitted in the future will run successfully, i.e.,
if the fault is *recoverable* and does not cause the device to become unable
to process future submits ('lost').

Device lost errors are very disruptive because they are 'sticky' and require
that the logical device is recreated before the error state is cleared.
In practice, many applications are not written to gracefully recover from
these errors.
For these reasons, 'hiding' any recoverable faults occur can be a
pragmatic choice.

The `VK_EXT_device_fault` extension was introduced to help diagnose device
lost errors, which can be challenging to resolve.
But this extension cannot be used to diagnose hidden recoverable faults
because it requires that the device is already in the lost state.

This proposal aims to encompass the functionality provided by
`VK_EXT_device_fault` whilst widening the scope to provide application
developers with a method to receive notifications and information about
fault events irrespective of whether or not they resulted in a device lost
error.

Such information could be used by a developer to diagnose visual artifacts,
performance issues or as input to telemetry.

Several options have been considered.

An alternative could be to just promote `vkGetDeviceFaultInfoEXT` to KHR &
allow `vkGetDeviceFaultInfoKHR` to be called before the device is in the
'lost' state - however, that does not support any form of blocking query,
so would incur more CPU overhead for polling to be effective, and would not
differentiate device lost & masked faults.

This option would introduce a new error code (e.g., "VK_ERROR_RECOVERABLE_FAULT_KHR")
that could be returned by the same API commands that can return VK_ERROR_DEVICE_LOST.

The error would *not* put the logical device in a permanent 'lost' state, but
would either:

* 
be reported as a one-time event (like other errors)

* 
be reported until explicitly acknowledged and cleared (e.g., by calling a
new command like `vkDeviceRecoverKHR`)

The downside to this option is that many applications are not written to handle
any runtime errors, which means that in practice any such error would result
in application termination.

This option adds to the capability of the previous "Polling" option to allow
blocking waits. This would allow applications to dispatch a low CPU usage
fault catcher thread, whilst still having a firm entry/exit point into the
driver.

This option adds a callback to return information on
faults.

This information provided by the callback mechanism is the same as for the polling approach.

The benefits of the callback mechanism would be that the application would be
notified immediately when events occur, rather than manually polling.

Disadvantage would be in complexity of threading behavior - to ensure prompt
callback delivery, it implies a driver-side thread and providing guarantees
as to application thread calling state at the point of dispatch would be
difficult.

From the solution space previously detailed, the option
[Introduce an extended reporting mechanism: Polling With Timeout](#_introduce_an_extended_reporting_mechanism_polling_with_timeout) was
selected as delivering many of the asynchronous delivery advantages of callbacks
whilst still providing a deterministic entry point to the driver with
guaranteed delivery thread context, whilst being less intrusive/problematic in
terms of required application-side support than adding additional error codes.

Applications can query for the presence of fault reports and corresponding diagnostic
information at any time by calling `vkGetDeviceFaultReportsKHR`.

`vkGetDeviceFaultReportsKHR()` replaces the old `vkGetDeviceFaultInfoEXT()` API
and aims to unify fault reporting in a more extensible fashion, whilst
allowing for blocking waits via a `timeout` parameter.

`vkGetDeviceFaultReportsKHR()` differs from `vkGetDeviceFaultInfoEXT()` in four
significant ways:

It may be called at any time, without the requirement for a VK_ERROR_DEVICE_LOST
condition to exist prior to the call.

It may report faults that did not result in a VK_ERROR_DEVICE_LOST condition
(if enabled via the deviceFaultReportMasked feature).

It provides support for blocking queries.

It is not the retrieval API for vendor binary dumps.

// Retrieve fault entries
VKAPI_ATTR VkResult VKAPI_CALL vkGetDeviceFaultReportsKHR(
    VkDevice                                    device,
    uint64_t                                    timeout,
    uint32_t*                                   pFaultCount,
    VkDeviceFaultReportKHR*                     pFaultInfos);

The signature of `vkGetDeviceFaultReportsKHR` follows the convention of
existing query functions (input parameters first), with the third parameter
`pFaultCount` providing the size of output array in the subsequent parameter
`pFaultInfos` (on input to fault retrieval), returning the number of results
written to `pFaultInfos` (on output from fault retrieval), or is populated
with the number of available results (on sizing query).

Faults are returned in order of occurrence.

`pFaultCount` must not be NULL.

`pFaultInfos` points to an array of size `*pFaultCount` entries to return, or
NULL. If `pFaultInfos==NULL`, then the number of available results is returned in
`*pFaultCount`. The fault entries are returned in order of occurrence.

`timeout` is the timeout period in units of nanoseconds. `timeout` is adjusted
to the closest value allowed by the implementation-dependent timeout accuracy,
which may be substantially longer than one nanosecond, and may be longer than
the requested period. If a zero `timeout` is passed then the function returns
immediately irrespective of whether any faults are available.

The entries returned by `vkGetDeviceFaultReportsKHR()` take the form shown below,
with populated fault reporting fields indicated by the `flags` field.

Each individual fault report is returned exactly once.

vkGetDeviceFaultReportsKHR() can be invoked in parallel from different
threads, in which case each invocation for a given device will
return a unique set of reports, with no fault report being returned
to more than one invocation.

typedef struct {
    VkStructureType             sType;
    void*                       pNext;
    VkDeviceFaultFlagsKHR       flags;              // indicates masking/device-loss/timeout status + which members are populated
    uint64_t                    groupID;            // unique groupID for grouping multiple faults
    char                        description[VK_MAX_DESCRIPTION_SIZE];
    VkDeviceFaultAddressInfoKHR faultAddressInfo;       // flags & VK_DEVICE_FAULT_FLAG_MEMORY_ADDRESS_KHR
    VkDeviceFaultAddressInfoKHR instructionAddressInfo; // flags & VK_DEVICE_FAULT_FLAG_INSTRUCTION_ADDRESS_KHR
    VkDeviceFaultVendorInfoKHR  vendorInfo;             // flags & VK_DEVICE_FAULT_FLAG_VENDOR_KHR
} VkDeviceFaultInfoKHR;

The `flags` field is a bitmask of the following values:

typedef enum {
    VK_DEVICE_FAULT_FLAG_DEVICE_LOST_KHR         = 1,
    VK_DEVICE_FAULT_FLAG_MEMORY_ADDRESS_KHR      = 2,
    VK_DEVICE_FAULT_FLAG_INSTRUCTION_ADDRESS_KHR = 4,
    VK_DEVICE_FAULT_FLAG_VENDOR_KHR              = 8,
    VK_DEVICE_FAULT_FLAG_WATCHDOG_TIMEOUT_KHR    = 16,
    VK_DEVICE_FAULT_FLAG_OVERFLOW_KHR            = 32,
} VkDeviceFaultFlagsKHR;

`VK_DEVICE_FAULT_FLAG_DEVICE_LOST_KHR` is a special flag, indicating that the
reported fault triggered VK_ERROR_DEVICE_LOST and that no subsequent faults
will be returned. If several VkDeviceFaultInfoKHR records are generated by a
single fault which triggers VK_ERROR_DEVICE_LOST, they should be grouped with
a single `groupID` and the last entry in the group marked with
`VK_DEVICE_FAULT_FLAG_DEVICE_LOST_KHR`.
This flag is also set for faults which have been made fatal via the
`deviceFaultDeviceLostOnMasked` feature flag.

`VK_DEVICE_FAULT_FLAG_OVERFLOW_KHR` is a special flag, indicating that an
internal fault log buffer overflow has occurred in the driver. For example,
if it implemented the fault record as a ring buffer, it has reached capacity
up and is utilizing an LRU scheme so is overwriting older fault records.
This flag is only set on the first fault entry read following missed faults due to an overflow.

`VK_DEVICE_FAULT_FLAG_MEMORY_ADDRESS_KHR` indicates that the
VkDeviceFaultInfoKHR faultAddressInfo field has been populated.

`VK_DEVICE_FAULT_FLAG_INSTRUCTION_ADDRESS_KHR` indicates that the
VkDeviceFaultInfoKHR instructionAddressInfo field has been populated.

`VK_DEVICE_FAULT_FLAG_VENDOR_KHR` indicates that the VkDeviceFaultInfoKHR
vendorInfo field has been populated.

`VK_DEVICE_FAULT_FLAG_WATCHDOG_TIMEOUT_KHR` indicates that a GPU timeout
has occurred (further information may be supplied via platform specific
extensions to the VkDeviceFaultInfoKHR structure’s pNext chain).

A `groupID` field is included to allow association of multiple faults to a
single event (eg. where multiple page faults are triggered from a single
event), and should be monotonically incrementing. Where an implementation
is unable to group events, the `groupID` should increment for every
reported event.

The VkDeviceFaultVendorInfoKHR structure is a direct promotion/alias of the existing
VkDeviceFaultVendorInfoEXT structure:

typedef struct VkDeviceFaultVendorInfoKHR {
    char        description[VK_MAX_DESCRIPTION_SIZE];
    uint64_t    vendorFaultCode;
    uint64_t    vendorFaultData;
} VkDeviceFaultVendorInfoKHR;

`description` must be a null-terminated UTF-8 string, and may provide a human readable description
of the fault.

The exact meaning/values of the `vendorFaultCode` and `vendorFaultData` fields
are vendor-defined.

* 
`VK_SUCCESS` is returned if the query completed within the specified timeout
period and at least one fault information was returned.

* 
`VK_TIMEOUT` is returned if no fault information is available within the
specified timeout period, even in the case that timeout was zero and no wait
was actually performed.

* 
`VK_INCOMPLETE` is returned if more fault reports are available than space
given in the `pFaultCount` parameter.

Implementations may return information on both page faults generated by invalid
memory accesses, and instruction pointers indicating the instructions executing
at the time of the fault.

typedef enum VkDeviceFaultAddressTypeKHR {
    VK_DEVICE_FAULT_ADDRESS_TYPE_NONE_KHR = 0,
    VK_DEVICE_FAULT_ADDRESS_TYPE_READ_INVALID_KHR = 1,
    VK_DEVICE_FAULT_ADDRESS_TYPE_WRITE_INVALID_KHR = 2,
    VK_DEVICE_FAULT_ADDRESS_TYPE_EXECUTE_INVALID_KHR = 3,
    VK_DEVICE_FAULT_ADDRESS_TYPE_INSTRUCTION_POINTER_UNKNOWN_KHR = 4,
    VK_DEVICE_FAULT_ADDRESS_TYPE_INSTRUCTION_POINTER_INVALID_KHR = 5,
    VK_DEVICE_FAULT_ADDRESS_TYPE_INSTRUCTION_POINTER_FAULT_KHR = 6,
    VK_DEVICE_FAULT_ADDRESS_TYPE_MAX_ENUM_KHR = 0x7FFFFFFF
} VkDeviceFaultAddressTypeKHR;

typedef struct VkDeviceFaultAddressInfoKHR {
    VkDeviceFaultAddressTypeKHR    addressType;
    VkDeviceAddress                reportedAddress;
    VkDeviceSize                   addressPrecision;
} VkDeviceFaultAddressInfoKHR;

Page addresses and instruction pointers are reported as GPU virtual addresses,
and additional extensions or vendor tools may be required in order to correlate
these extensions with individual Vulkan objects.

Implementations may only be able to report these addresses with limited
precision. The combination of `reportedAddress` and `addressPrecision`
allow the possible range of addresses to be calculated, such that:

lower_address = (pInfo->reportedAddress & ~(pInfo->addressPrecision-1))
upper_address = (pInfo->reportedAddress |  (pInfo->addressPrecision-1))

Making the vendor binary retrieval a distinct API allows us to restrict its
usage to only situations where VK_ERROR_DEVICE_LOST has been returned.

`vkGetDeviceFaultDebugInfoKHR()` returns a single vendor binary which
reflects the state of the device when device loss occurred.
Vendor binary availability does not persist beyond device destruction.

Once a vendor binary has been retrieved, repeated calls to
`vkGetDeviceFaultDebugInfoKHR()` will return the same vendor binary.

// Retrieve Extended Fault Info (Vendor Binary Dump, etc)
VKAPI_ATTR VkResult VKAPI_CALL vkGetDeviceFaultDebugInfoKHR(
    VkDevice                                    device,
    VkDeviceFaultDebugInfoKHR                   *pDebugInfo);

Where `device` is a device which must have returned VK_ERROR_DEVICE_LOST
and `pDebugInfo` must be a pointer to a VkDeviceFaultDebugInfoKHR structure.

In cases where the application will destroy/recreate the device, it is the
responsibility of the application code to ensure that the device is not
destroyed prior to calling `vkGetDeviceFaultDebugInfoKHR()`.

typedef struct VkDeviceFaultDebugInfoKHR {
    VkStructureType                 sType;
    void*                           pNext;              // Can chain VkDeviceFaultShaderAbortMessageCountsKHR and/or VkDeviceFaultShaderAbortMessageInfoKHR on this
    uint32_t                        vendorBinarySize;
    void*                           pVendorBinary;      // If vendorBinarySize is non-zero, pVendorBinary must not be NULL and must point to a buffer of size vendorBinarySize.
} VkDeviceFaultDebugInfoKHR;

The vendor binary is retrieved via a VkDeviceFaultDebugInfoKHR structure,
which may be extended via the pNext chain to retrieve further information
(for example, via the shader abort extension).

The `VkDeviceFaultDebugInfoKHR` structure follows the convention of
existing query functions, where the `vendorBinarySize` field indicates
size of output array (pVendorBinary) in bytes, the number of bytes written, or
is populated by the driver with the number of bytes required to retrieve the
vendor binary blob.

`pVendorBinary` points to a buffer of size `vendorBinarySize` bytes, or NULL
for a sizing query in which case the `vendorBinarySize` field is populated with
the number of bytes required for retrieval.

VkDeviceFaultDebugInfoKHR may be extended to retrieve further information relating to device loss, for example using a VkDeviceFaultShaderAbortMessageInfoKHR structure where VK_KHR_shader_abort is in use.
state debug information via the pNext chain (for example, by VK_KHR_shader_abort)

* 
`VK_SUCCESS` is returned if a valid vendor binary has been returned in
`*pVendorBinaryData` or if pVendorBinaryData is null and the size of the vendor
binary has been returned in `*pVendorBinarySize`.

* 
`VK_ERROR_NOT_ENOUGH_SPACE_KHR` is returned if not enough space was provided
for the vendor binary to be returned.

The following features are exposed by the `VK_KHR_device_fault` extension:

typedef struct VkPhysicalDeviceFaultFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           deviceFault;
    VkBool32           deviceFaultVendorBinary;
    VKBool32           deviceFaultReportMasked;
    VKBool32           deviceFaultDeviceLostOnMasked;
} VkPhysicalDeviceFaultFeaturesKHR;

`deviceFault` is the main feature enabling this extension’s functionality and
must be supported if this extension is supported.

`deviceFaultVendorBinary` is an optional feature that enables support for
vendor-specific binary crash dumps, which may be interpreted via external vendor
tools. These are only generated after device-loss.

`deviceFaultReportMasked` is an optional feature which enables faults that
would normally be masked by the implementation (ie. automatically recovered by
the driver internally without the application receiving a VK_ERROR_DEVICE_LOST
error) to be reported via this extension even if they did not result
in a VK_ERROR_DEVICE_LOST condition being returned to the application.

`deviceFaultDeviceLostOnMasked` is an optional feature that if supported
& enabled, causes the driver to return VK_ERROR_DEVICE_LOST for faults which
would otherwise be masked by the implementation.

typedef struct VkPhysicalDeviceFaultPropertiesKHR {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxDeviceFaultCount;
} VkPhysicalDeviceFaultPropertiesKHR;

Implementations are expected to retain fault reports in a fixed size buffer.

`maxDeviceFaultCount` is the maximum number of faults for which an implementations
is required to retain information. If the number of faults generated exceeds this
limit, then the oldest records will be overwritten.

Querying for faults via `vkGetDeviceFaultReportsKHR()` will drain records from the
fault buffer, freeing space for new records.

`maxDeviceFaultCount` must be greater than or equal to 1.

  VkPhysicalDeviceFaultFeaturesKHR deviceDeviceFaultFeatures = {};
  deviceDeviceFaultFeatures.sType = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FAULT_FEATURES_KHR;
  deviceDeviceFaultFeatures.deviceFault = VK_TRUE;
  deviceDeviceFaultFeatures.deviceFaultReportMasked = VK_TRUE;
  //...

// Query number of available results
uint32_t faultCounts;
if ((vkGetDeviceFaultReportsKHR(device, 0, &faultCounts, NULL) == VK_SUCCESS)
    && (faultCounts)) {
    // Allocate output arrays and query fault data
    VkDeviceFaultInfoKHR *pFaultInfo;
    pFaultInfo = (VkDeviceFaultInfoKHR*)calloc(faultCounts, sizeof(VkDeviceFaultInfoKHR));
    for(int n = 0; n 

The application may choose to implement a scheme (likely on a separate thread)
which uses a blocking query to wait for fault information to become available.

// Query number of available results
uint32_t faultCount;

while(true) {
    // Blocking query for fault counts
    if ((vkGetDeviceFaultReportsKHR(device, 1000, &faultCounts, NULL) == VK_SUCCESS)
        && (faultCounts)) {
        // Allocate output arrays and query fault data
        VkDeviceFaultInfoKHR *pFaultInfo;
        pFaultInfo = (VkDeviceFaultInfoKHR*)calloc(faultCounts, sizeof(VkDeviceFaultInfoKHR));
        for(int n = 0; n 

Alternative (single query, no dynamic allocation):

// Query number of available results
uint32_t faultCount;
VkDeviceFaultInfoKHR faultInfo{}
faultInfo.sType             = VK_STRUCTURE_TYPE_DEVICE_FAULT_INFO_KHR;
while(true) {
    // Blocking query for single fault address
    faultCount = 1;
    VkResult r = vkGetDeviceFaultReportsKHR(device, 1000, &faultCount, &faultInfo);
    if (((r == VK_SUCCESS) || (r == VK_INCOMPLETE)) && (faultCount)) {
        // a fault is returned, do something with it
    } else if (r == VK_TIMEOUT) {
        // not an error, but a chance to exit if this is being run on a thread
    } else {
        // do something about the error return?
    }
}

Retrieving Vendor Binary in response to Device Lost:

// Query number of available results
uint32_t faultCount;
VkDeviceFaultInfoKHR faultInfo{}
faultInfo.sType             = VK_STRUCTURE_TYPE_DEVICE_FAULT_INFO_KHR;
while(true) {
    // Blocking query for single fault address
    faultCount = 1;
    VkResult r = vkGetDeviceFaultReportsKHR(device, 1000, &faultCount, &faultInfo);
    if (((r == VK_SUCCESS) || (r == VK_INCOMPLETE)) && (faultCount)) {
        // a fault is returned, do something with it
        if (faultInfo.flags & VK_DEVICE_FAULT_FLAG_DEVICE_LOST_KHR) {
            // This is a device lost fault...
            VkDeviceFaultDebugInfoKHR debugInfo = {
                .sType            = VK_STRUCTURE_TYPE_DEVICE_FAULT_DEBUG_INFO_KHR
                .pNext            = NULL,
                .vendorBinarySize = 0,
                .pVendorBinary    = NULL
            };
            // Sizing query
            if ((vkGetDeviceFaultDebugInfoKHR(device, &debugInfo) == VK_SUCCESS) && (debugInfo.vendorBinarySize)) {
                debugInfo.pVendorBinary = malloc(debugInfo.vendorBinarySize);
                // Vendor Binary Retrieval
                vkGetDeviceFaultDebugInfoKHR(device, &debugInfo);
            }
        }
    } else if (r == VK_TIMEOUT) {
        // not an error, but a chance to exit if this is being run on a thread
    } else {
        // do something about the error return - possibly nothing at all?
    }
}

Retrieving Shader Abort Messages:

// Query number of available results
uint32_t faultCount;
VkDeviceFaultInfoKHR faultInfo{}
faultInfo.sType             = VK_STRUCTURE_TYPE_DEVICE_FAULT_INFO_KHR;
while(true) {
    // Blocking query for single fault address
    faultCount = 1;
    VkResult r = vkGetDeviceFaultReportsKHR(device, 1000, &faultCount, &faultInfo);
    if (((r == VK_SUCCESS) || (r == VK_INCOMPLETE)) && (faultCount)) {
        // a fault is returned, do something with it
        if (faultInfo.flags & VK_DEVICE_FAULT_FLAG_DEVICE_LOST_KHR) {
            // This is a device lost fault... check for shader abort messages
            VkDeviceFaultShaderAbortMessageInfoKHR abortMessageInfo = {
                .sType           = VK_STRUCTURE_TYPE_DEVICE_FAULT_SHADER_ABORT_MESSAGE_INFO_KHR,
                .pNext           = NULL,
                .messageDataSize = 0,
                .messageData     = NULL
            };
            VkDeviceFaultDebugInfoKHR debugInfo = {
                .sType           = VK_STRUCTURE_TYPE_DEVICE_FAULT_DEBUG_INFO_KHR
                .pNext           = &abortMessageInfo, // VkDeviceFaultShaderAbortMessageInfoKHR extends VkDeviceFaultDebugInfoKHR
                .vendorBinarySize = 0,
                .pVendorBinary    = NULL
            };
            if ((vkGetDeviceFaultDebugInfoKHR(device, &debugInfo) == VK_SUCCESS) && (abortMessageInfo.messageDataSize)) {
                // There is a shader abort message payload available - allocate space & retrieve it
                abortMessageInfo.messageData  = malloc(abortMessageInfo.messageDataSize);
                vkGetDeviceFaultDebugInfoKHR(device, &debugInfo);

                // Process each shader abort message
                // NOTE: in this example, up to 20 parameters are supported - this is NOT an API restriction.
                char formattedOutput[1024]; // Formatted message output buffer
                size_t offset = 0;          // Offset in message data
                int n = 0;                  // Number of parameters found
                char *param[20];            // Extracted parameter array
                uint32_t paramSize[20];     // Extracted parameter sizes
                for(n = 0; (n 

**RESOLVED**: The VulkanSC style notification callbacks are removed from this proposal.

What happens if you mismatch these counts compared to what is actually available (particularly for vendor binaries).

**RESOLVED**

`vkGetDeviceFaultReportsKHR()` should return  VK_INCOMPLETE as long as any array (fault addresses or vendor binaries) is not fully drained.

**PROPOSED**: The faults will likely be detected asynchronously, we therefore
allow them to be reported whenever they are detected, and that may happen
on background threads.

**RESOLVED**: Callbacks removed from scope.

This proposal builds on `VK_EXT_device_fault`. Therefore, an alternative could
be to just allow `vkGetDeviceFaultInfoEXT` to be called before the device is
in the 'lost' state - however, that does not support any form of blocking
query, so would incur more CPU overhead for polling to be effective.

Another option was to mirror the Fault Handling mechanism used in Vulkan SC but
report a different set of data. However, in common with the modified
`VK_EXT_device_fault` approach, this would also preclude a blocking query
and has the disadvantage of bringing callbacks back into scope.

**RESOLVED**

The timeout parameter added is intended specifically to allow for non-polling
fault-monitor thread implementations.

**RESOLVED**

Previous versions of this proposal included callbacks with the statement
"The callback may be called from multiple threads simultaneously,
including from a background thread other than the thread calling the Vulkan
commands". This sounded error prone, so for clarity, if callbacks were to be
supported they should be serialized by the UMD, with each fault being reported
once only via the callback mechanism, rather than allowing for multiple threads
to be simultaneously reporting possibly overlapping sections of a the fault
logs.

**RESOLVED**

How should multiple calls to vkGetDeviceFaultReportsKHR() be handled in
parallel?

Does the driver need to expose the upper limit of recordable non-device lost
faults?

Clarify behavior when app does not query faults rapidly enough and the ring
log overflows those limits. Possibilities include:

* 
"drop subsequent faults, report first encountered"

* 
"LRU ring eviction, drop the oldest fault, always report most recent".

**RESOLVED**
LRU eviction is required to ensure that a fatal (device lost) error is not
dropped due to ring overflow.

Yes. Added maxDeviceFaultCount in VkPhysicalDeviceFaultPropertiesKHR structure.

**RESOLVED**

Proposal: flag on first returned info following data loss.

RESOLVED: Added VK_DEVICE_FAULT_FLAG_OVERFLOW_KHR

How should this be treated?

Proposal: No vendor binaries should be returned unless device lost has been reported.

**RESOLVED**

Propose yes - Requesting a vendor binary (i.e. passing a non-zero vendor binary size) and then providing insufficient storage should return `VK_ERROR_NOT_ENOUGH_SPACE_KHR`. This should occur before any address/vendor info structs are returned (i.e. the fault buffers should not be drained on error)

**RESOLVED** in separated vendor binary retrieval API.

Additional functionality that could be considered:

* 
adding a 'treat faults as errors' option to require that reported fault
result in device lost.

* 
adding parameters to control how many faults the implementation reports
or tracks.

1.0 Initial version
