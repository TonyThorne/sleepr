import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { Types } from 'mongoose';
import { ReservationDocument } from './models/reservation.schema';

describe('ReservationsController', () => {
  let controller: ReservationsController;
  let service: ReservationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationsController],
      providers: [
        {
          provide: ReservationsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ReservationsController>(ReservationsController);
    service = module.get<ReservationsService>(ReservationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Test cases for the controller methods
  it('should call the create method on the service', async () => {
    const createReservationDto = {
      startDate: new Date('2023-05-01T00:00:00.000Z'),
      endDate: new Date('2023-05-10T00:00:00.000Z'),
      placeId: 'some-place-id',
      invoiceId: 'some-invoice-id',
    };

    const expectedResult: ReservationDocument = {
      _id: new Types.ObjectId('644cf16657e015562ccc1838'),
      startDate: new Date('2023-05-01T00:00:00.000Z'),
      endDate: new Date('2023-05-10T00:00:00.000Z'),
      placeId: 'some-place-id',
      invoiceId: 'some-invoice-id',
      userId: '123',
      timestamp: new Date('2023-04-29T12:00:00.000Z'),
    };

    const createSpy = jest
      .spyOn(service, 'create')
      .mockResolvedValue(Promise.resolve(expectedResult));
    const result = await controller.create(createReservationDto);

    expect(createSpy).toHaveBeenCalledWith(createReservationDto);
    expect(result).toEqual({
      ...expectedResult,
      startDate: expectedResult.startDate,
      endDate: expectedResult.endDate,
      timestamp: expectedResult.timestamp,
    });
  });
  // Add similar test cases for the other controller methods using jest.spyOn()
});
